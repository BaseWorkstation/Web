import Router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentPlans } from "redux/slices/paymentSlice";

const options = [
  // {
  //   name: "Add a card (P.A.Y.G)",
  //   href: "/settings/payment/add/card",
  // },
  {
    name: "Subscribe to a plan",
    href: "/settings/payment/add/plan",
  },
];

export default function useAddMethodHook() {
  const [paymentOption, setPaymentOption] = useState(null);
  const { paymentPlans } = useSelector((state) => state.payments);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the payment plans have been loaded already,
    // If not, load the plans before the user gets to the subscription page
    if (!paymentPlans.length) {
      dispatch(fetchPaymentPlans());
    }
  }, []);

  const proceedWithOption = () => {
    // Here, the payment option is represented as the option href
    Router.push(paymentOption);
  };

  return { options, paymentOption, setPaymentOption, proceedWithOption };
}
