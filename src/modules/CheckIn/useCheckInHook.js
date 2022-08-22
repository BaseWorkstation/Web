import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkInToSpace, fetchSpaceServices } from "redux/slices/spaceSlice";
import { fetchUserByPin, requestUserPin } from "redux/slices/userSlice";
import { toastError, toastSuccess } from "utils/helpers";

export default function useCheckInHook() {
  const [stage, setStage] = useState("SCAN_QR");
  const [pin, setPin] = useState("");
  const [workspace, setWorkspace] = useState(null);
  const { spaceServices: workspaceServices, loading } = useSelector(
    (state) => state.spaces
  );

  const forgotPinDisclosure = useDisclosure();

  const { query } = useRouter();
  const dispatch = useDispatch();

  const getWorkspaceDetailsFromUrl = (url) => {
    try {
      const { searchParams } = new URL(url);
      const workspaceId = searchParams.get("workstation_id");
      const workspaceName = searchParams.get("workstation_name");

      if (!workspaceId || !workspaceName) return null;

      return { id: workspaceId, name: workspaceName };
    } catch (error) {
      console.log(error);
      return null;
    }
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

  useEffect(() => {
    handleScanResult({ text: window.location.href });
  }, []);

  const handleRequestPin = async (email) => {
    if (!email.trim()) return null;

    try {
      await dispatch(
        requestUserPin({
          email,
        })
      ).unwrap();
      toastSuccess("Your base pin has been sent to the email you provided.");
    } catch (error) {
      toastError(null, error);
    }
  };

  const handleSubmitPin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(
        fetchUserByPin({
          unique_pin: pin,
        })
      ).unwrap();
      setStage("CHOOSE_SERVICE");
    } catch (error) {
      toastError(null, error);
    }
  };

  const handleSubmitService = async (serviceId) => {
    try {
      const data = await dispatch(
        checkInToSpace({
          service_id: serviceId,
          unique_pin: pin,
        })
      ).unwrap();

      toastSuccess("Checked in successfully!");
      setStage("SHOW_ATTENDANT");
      // Save access token of newly checked-in user to localStorage
      localStorage.setItem("base_acccess_token", data?.token);
    } catch (error) {
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
    forgotPinDisclosure,
    handleRequestPin,
  };
}
