import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamActivities, fetchTeam } from "redux/slices/teamSlice";
import { fetchUserActivities } from "redux/slices/userSlice";
import { formatDateToYYYYMMDD } from "utils/helpers";

export default function useActivitiesHook() {
  const currentMonth = moment().format("yyyy-MM");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const {
    userDetails,
    userActivities,
    loading: userLoading,
  } = useSelector((state) => state.user);
  const { team, teamActivities, loading } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const currentTeamId =
    userDetails?.owned_teams[0] || userDetails?.joined_teams[0];
  const isTeamOwner = !!userDetails?.owned_teams[0];

  useEffect(() => {
    if (!team) {
      dispatch(fetchTeam({ id: currentTeamId }));
    }
  }, []);

  useEffect(() => {
    dispatch(
      fetchUserActivities({
        from_date: `${selectedMonth}-01`,
        to_date: `${selectedMonth}-${moment(selectedMonth).daysInMonth()}`,
        user_id: userDetails.id,
      })
    );
  }, [selectedMonth]);

  useEffect(() => {
    if (team) {
      dispatch(
        fetchTeamActivities({
          from_date: `${selectedMonth}-01`,
          to_date: `${selectedMonth}-${moment(selectedMonth).daysInMonth()}`,
          team_id: team.id,
        })
      );
    }
  }, [!!team, selectedMonth]);

  return {
    currentMonth,
    selectedMonth,
    setSelectedMonth,
    teamLoading:
      loading === "FETCH_TEAM" || loading === "FETCH_TEAM_ACTIVITIES",
    team,
    isTeamOwner,
    teamActivities,
    userActivities,
    userLoading: userLoading === "FETCH_USER_ACTIVITIES",
  };
}
