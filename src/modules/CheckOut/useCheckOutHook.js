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
  const [stage, setStage] = useState("CONFIRM_PIN");
  const [pin, setPin] = useState("");
  const { teams } = useSelector((state) => state.teams);
  const [method, setMethod] = useState("");
  const [checkoutDetails, setCheckoutDetails] = useState(null);
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
    try {
      const data = await dispatch(fetchCurrentCheckIn()).unwrap();
      // setCheckoutDetails(data?.workstation);
    } catch (error) {}
  };

  const currentUserPlan = userDetails?.payment_methods?.find(
    ({ method }) => method === "plan"
  )?.plan;

  const currentTeamPlan = currentTeam?.payment_methods?.find(
    ({ method }) => method === "plan"
  )?.plan;

  const handleSubmitMethod = async () => {
    setStage("CONFIRM_OTP");
  };

  const openPaymentWindow = async (id) => {
    try {
      const data = await dispatch(fetchPaymentReference()).unwrap();
      setReference(data.reference);
    } catch (error) {
      toastError(null, error);
    }
  };

  const handleSubmitPin = async (event) => {
    event.preventDefault();
    // if (method === "PAYG_cash") {
    //   openPaymentWindow();
    // } else {
    // }

    try {
      const data = await dispatch(
        checkOutOfSpace({
          user_id: userDetails?.id,
          unique_pin: pin,
        })
      ).unwrap();
      console.log(data);
      setCheckoutDetails(data);
      setStage("SHOW_SUMMARY");
    } catch (error) {
      toastError(null, error);
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

    try {
      await dispatch(checkOutOfSpace(apiPayload)).unwrap();
      toastSuccess("Checked out successfully!");
      setStage("SHOW_CONFIRMATION");
    } catch (error) {
      toastError(null, error);
    }
  };

  return {
    stage,
    checkoutDetails,
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
