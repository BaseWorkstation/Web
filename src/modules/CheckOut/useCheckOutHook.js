import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkInToSpace,
  checkOutOfSpace,
  fetchSpaceServices,
} from "redux/slices/spaceSlice";
import { fetchTeams } from "redux/slices/teamSlice";
import { fetchUserByPin } from "redux/slices/userSlice";
import { toastError, toastSuccess } from "utils/helpers";

export default function useCheckOutHook() {
  const [stage, setStage] = useState("SHOW_SUMMARY");
  const [pin, setPin] = useState("");
  const { teams } = useSelector((state) => state.teams);
  const [method, setMethod] = useState("");
  const [workspace, setWorkspace] = useState(null);
  const {
    spaceServices: workspaceServices,
    currentCheckIn,
    loading,
  } = useSelector((state) => state.spaces);
  const { userDetails } = useSelector((state) => state.user);

  const { query } = useRouter();
  const dispatch = useDispatch();
  const currentTeam = teams[0];

  useEffect(() => {
    if (!teams.length) {
      dispatch(fetchTeams());
    }
  }, []);

  const currentUserPlan = userDetails?.payment_methods?.find(
    ({ method }) => method === "plan"
  )?.plan;

  const currentTeamPlan = currentTeam?.payment_methods?.find(
    ({ method }) => method === "plan"
  )?.plan;

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

  const handleSubmitMethod = async () => {
    setStage("CONFIRM_PIN");
  };

  const handleSubmitPin = async (event) => {
    event.preventDefault();

    let apiPayload = {
      // user_id: userDetails?.id,
      // unique_pin: pin,
      user_id: 1,
      unique_pin: "2049",
    };

    if (method === "PAYG_cash") {
      apiPayload = {
        ...apiPayload,
        payer: "User",
        payment_method_type: "PAYG_cash",
      };
    }
    if (method === "plan") {
      apiPayload = {
        ...apiPayload,
        payer: "User",
        payment_method_type: "plan",
        payment_method_id: currentUserPlan?.id,
      };
    }

    if (method === "team") {
      apiPayload = {
        ...apiPayload,
        payer: "Team",
        team_id: currentTeam?.id,
      };
    }

    const { payload, error } = await dispatch(checkOutOfSpace(apiPayload));

    if (payload?.id) {
      toastSuccess("Checked out successfully!");
      setStage("SHOW_CONFIRMATION");
    } else {
      console.log(error);
      toastError(null, error);
    }
  };

  return {
    stage,
    handleScanResult,
    workspace,
    currentCheckIn,
    currentUserPlan,
    currentTeamPlan,
    pin,
    setPin,
    method,
    setMethod,
    handleSubmitMethod,
    workspaceServices,
    handleSubmitPin,
    isCheckingOut: loading === "CHECK_OUT_OF_SPACE",
  };
}
