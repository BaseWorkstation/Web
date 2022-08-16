import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentReference } from "redux/slices/paymentSlice";
import {
  checkInToSpace,
  checkOutOfSpace,
  fetchCurrentCheckIn,
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
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");

  const config = {
    reference,
    email: userDetails?.email,
    amount: amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    firstname: userDetails?.first_name,
    lastname: userDetails?.last_name,
  };
  const initializePayment = usePaystackPayment(config);

  const dispatch = useDispatch();
  const currentTeam = teams[0];

  const onSuccess = (reference) => {
    savePayment(reference);
    setReference("");
  };

  const onClosed = () => {
    setReference("");
  };

  useEffect(() => {
    if (reference) {
      initializePayment(onSuccess, onClosed);
    }
  }, [reference]);

  useEffect(() => {
    if (!teams.length) {
      dispatch(fetchTeams());
    }
    if (userDetails?.check_in_status) {
      handleFetchCheckIn();
    }
  }, []);

  const handleFetchCheckIn = async () => {
    const { payload, error } = await dispatch(fetchCurrentCheckIn());

    if (payload.id) {
      setWorkspace(payload?.workstation);
    }
  };

  const currentUserPlan = userDetails?.payment_methods?.find(
    ({ method }) => method === "plan"
  )?.plan;

  const currentTeamPlan = currentTeam?.payment_methods?.find(
    ({ method }) => method === "plan"
  )?.plan;

  const handleSubmitMethod = async () => {
    setStage("CONFIRM_PIN");
  };

  const openPaymentWindow = async (id) => {
    const { payload, error } = await dispatch(fetchPaymentReference());

    if (payload?.id) {
      setReference(payload.reference);
    } else {
      toastError(null, error);
    }
  };

  const handleSubmitPin = async (event) => {
    event.preventDefault();
    if (method === "PAYG_cash") {
      openPaymentWindow();
    } else {
    }
  };

  const savePayment = async (reference) => {
    let apiPayload = {
      user_id: userDetails?.id,
      unique_pin: pin,
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
    isCheckedIn: userDetails?.check_in_status,
    isCheckingOut: loading === "CHECK_OUT_OF_SPACE",
  };
}
