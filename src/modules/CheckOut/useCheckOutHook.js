import { useDisclosure } from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentReference } from "redux/slices/paymentSlice";
import {
  checkInToSpace,
  checkOutOfSpace,
  confirmCheckoutOTP,
  fetchCurrentCheckIn,
  fetchSpaceServices,
  saveCheckoutPayment,
} from "redux/slices/spaceSlice";
import { fetchUserByPin, requestUserPin } from "redux/slices/userSlice";
import { toastError, toastSuccess } from "utils/helpers";

export default function useCheckOutHook() {
  const [stage, setStage] = useState("CONFIRM_PIN");
  const [pin, setPin] = useState("");
  const { userDetails } = useSelector((state) => state.user);
  const currentUserPlan = userDetails?.payment_methods?.find(
    ({ method }) => method === "plan"
  );

  const [method, setMethod] = useState(currentUserPlan ? "plan" : "");
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const {
    spaceServices: workspaceServices,
    currentCheckIn,
    loading,
  } = useSelector((state) => state.spaces);
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");

  const config = {
    reference,
    email: userDetails?.email,
    amount: (amount || 1) * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    firstname: userDetails?.first_name,
    lastname: userDetails?.last_name,
  };
  const initializePayment = usePaystackPayment(config);
  const forgotPinDisclosure = useDisclosure();

  const dispatch = useDispatch();

  const onSuccess = ({ reference }) => {
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
    if (userDetails?.check_in_status) {
      handleFetchCheckIn();
    }
  }, []);

  const handleFetchCheckIn = async () => {
    await dispatch(
      fetchCurrentCheckIn({
        workstation_id: userDetails?.current_visit?.workstation_id,
      })
    ).unwrap();
  };

  const handleSubmitMethod = async () => {
    setStage("CONFIRM_OTP");
  };

  const openPaymentWindow = async () => {
    try {
      const uniqueReference = `base_checkout_${nanoid()}`;
      setReference(uniqueReference);
    } catch (error) {
      toastError(null, error);
    }
  };

  const handleSubmitPin = async (event) => {
    event.preventDefault();

    try {
      const data = await dispatch(
        checkOutOfSpace({
          user_id: userDetails?.id,
          unique_pin: pin,
        })
      ).unwrap();
      setCheckoutDetails(data);
      setAmount(data?.total_value_of_minutes_spent_in_naira);
      setStage("SHOW_SUMMARY");
    } catch (error) {
      toastError(null, error);
    }
  };

  const handleSubmitOTP = async (otp) => {
    try {
      const data = await dispatch(
        confirmCheckoutOTP({
          visit_id: checkoutDetails?.id,
          otp,
        })
      ).unwrap();
      console.log(data);

      if (method === "PAYG_card") {
        openPaymentWindow();
      } else {
        savePayment();
      }
    } catch (error) {
      toastError(null, error);
    }
  };

  const savePayment = async (reference) => {
    let apiPayload = {
      visit_id: checkoutDetails?.id,
      payment_method_type: method,
    };

    if (method === "PAYG_card") {
      apiPayload = {
        ...apiPayload,
        payment_reference: reference,
      };
    }

    if (method === "plan") {
      apiPayload = {
        ...apiPayload,
        payment_method_id: currentUserPlan?.id,
      };
    }

    try {
      await dispatch(saveCheckoutPayment(apiPayload)).unwrap();
      toastSuccess("Payment made successfully!");
      setStage("SHOW_CONFIRMATION");
    } catch (error) {
      toastError(null, error);
    }
  };

  const handleRequestPin = async (email) => {
    if (!email.trim()) return null;

    try {
      await dispatch(
        requestUserPin({
          email,
        })
      ).unwrap();
      toastSuccess("Your base pin has been sent to the email you provided.");
      forgotPinDisclosure.onClose();
    } catch (error) {
      toastError(null, error);
    }
  };

  return {
    stage,
    checkoutDetails,
    currentCheckIn,
    currentUserPlan,
    pin,
    setPin,
    method,
    setMethod,
    handleSubmitMethod,
    workspaceServices,
    handleSubmitPin,
    isCheckedIn: userDetails?.check_in_status,
    isCheckingOut: loading === "CHECK_OUT_OF_SPACE",
    isConfirmingOTP: loading === "CONFIRM_CHECKOUT_OTP",
    isSavingPayment: loading === "SAVE_CHECKOUT_PAYMENT",
    handleSubmitOTP,
    forgotPinDisclosure,
    handleRequestPin,
  };
}
