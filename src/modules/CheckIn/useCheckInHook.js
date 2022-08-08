import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkInToSpace, fetchSpaceServices } from "redux/slices/spaceSlice";
import { fetchUserByPin } from "redux/slices/userSlice";
import { toastError, toastSuccess } from "utils/helpers";

export default function useCheckInHook() {
  const [stage, setStage] = useState("SCAN_QR");
  const [pin, setPin] = useState("");
  const [workspace, setWorkspace] = useState(null);
  const { spaceServices: workspaceServices, loading } = useSelector(
    (state) => state.spaces
  );

  const dispatch = useDispatch();

  const getWorkspaceDetailsFromUrl = (url) => {
    const { searchParams } = new URL(url);
    const workspaceId = searchParams.get("workstation_id");
    const workspaceName = searchParams.get("workstation_name");

    if (!workspaceId || !workspaceName) return null;

    return { id: workspaceId, name: workspaceName };
  };

  const fetchWorkspaceServices = (workspace) => {
    dispatch(fetchSpaceServices({ workstation_id: workspace.id }));
  };

  const handleScanResult = (result, error) => {
    if (!!result) {
      const workspace = getWorkspaceDetailsFromUrl(result?.text);

      if (workspace) {
        setWorkspace(workspace);
        fetchWorkspaceServices(workspace);
        setStage("CONFIRM_PIN");
      }
    }
    if (!!error) {
      console.log(error);
    }
  };

  const handleSubmitPin = async (event) => {
    event.preventDefault();

    const { payload, error } = await dispatch(
      fetchUserByPin({
        unique_pin: pin,
      })
    );

    if (payload?.id) {
      setStage("CHOOSE_SERVICE");
    } else {
      console.log(error);
      toastError(null, error);
    }
  };

  const handleSubmitService = async (serviceId) => {
    const { payload, error } = await dispatch(
      checkInToSpace({
        service_id: serviceId,
        unique_pin: pin,
      })
    );

    if (payload?.id) {
      toastSuccess("Checked in successfully!");
      setStage("SHOW_ATTENDANT");
      // Save access token of newly checked-in user to localStorage
      localStorage.setItem("base_acccess_token", payload?.token);
    } else {
      console.log(error);
      toastError(null, error);
    }
  };

  return {
    stage,
    handleScanResult,
    workspace,
    pin,
    setPin,
    handleSubmitPin,
    workspaceServices,
    handleSubmitService,
    isCheckingIn: loading === "CHECK_IN_TO_SPACE",
  };
}
