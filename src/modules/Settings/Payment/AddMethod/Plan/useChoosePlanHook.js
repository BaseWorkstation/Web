import Router from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "redux/slices/paymentSlice";
import { toastError, toastSuccess } from "utils/helpers";

export default function useChoosePlanHook() {
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChoosePlan = async (planCode, reference) => {
    try {
      await dispatch(
        addPaymentMethod({
          paymentable_model: "User",
          paymentable_id: userDetails.id,
          method_type: "plan",
          plan_code: planCode,
          payment_reference: reference,
        })
      ).unwrap();

      toastSuccess("Subscribed to plan successfully!");
      Router.push("/");
    } catch (error) {
      toastError(null, error);
    }
  };

  return {
    handleChoosePlan,
  };
}
