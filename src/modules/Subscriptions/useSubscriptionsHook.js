import Router from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "redux/slices/paymentSlice";
import { fetchTeam } from "redux/slices/teamSlice";
import { toastError, toastSuccess } from "utils/helpers";

export default function useSubscriptionsHook() {
  const { userDetails } = useSelector((state) => state.user);
  const { team } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const currentTeamId =
    userDetails?.owned_teams[0] || userDetails?.joined_teams[0];
  const currentTeam = team;
  const isTeamOwner = !!userDetails?.owned_teams[0];

  useEffect(() => {
    if (!team) {
      dispatch(fetchTeam({ id: currentTeamId }));
    }
  }, []);

  const currentUserPlan = userDetails?.payment_methods?.find(
    ({ method }) => method === "plan"
  )?.plan;

  const currentTeamPlan = currentTeam?.payment_methods?.find(
    ({ method }) => method === "plan"
  )?.plan;

  const handleChooseUserPlan = async (planCode, reference, model) => {
    try {
      await dispatch(
        addPaymentMethod({
          paid_by_model: model,
          paid_by_id: userDetails.id,
          paid_for_model: "User",
          paid_for_id: userDetails.id,
          method_type: "plan",
          plan_code: planCode,
          payment_reference: reference,
        })
      ).unwrap();

      toastSuccess("Subscribed to plan successfully!");

      Router.reload();
    } catch (error) {
      toastError(null, error);
    }
  };

  const handleChooseTeamPlan = async (planCode, reference, model) => {
    try {
      await dispatch(
        addPaymentMethod({
          paid_by_model: model,
          paid_by_id: currentTeam?.id,
          paid_for_model: "User",
          paid_for_id: userDetails.id,
          method_type: "plan",
          plan_code: planCode,
          payment_reference: reference,
        })
      ).unwrap();
      toastSuccess("Subscribed to plan successfully!");
      Router.reload();
    } catch (error) {
      toastError(null, error);
    }
  };

  return {
    isTeamOwner,
    currentUserPlan,
    handleChooseUserPlan,
    currentTeamPlan,
    handleChooseTeamPlan,
  };
}
