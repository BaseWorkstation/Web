import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamActivities, fetchTeam } from "redux/slices/teamSlice";
import { fetchUserActivities } from "redux/slices/userSlice";
import { formatDateToYYYYMMDD } from "utils/helpers";

export default function useActivitiesHook() {
  const [selectedDay, setSelectedDay] = useState(new Date());
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
        from_date: formatDateToYYYYMMDD(selectedDay),
        to_date: formatDateToYYYYMMDD(selectedDay),
        user_id: userDetails.id,
      })
    );
  }, [selectedDay]);

  useEffect(() => {
    if (team) {
      dispatch(
        fetchTeamActivities({
          from_date: formatDateToYYYYMMDD(selectedDay),
          to_date: formatDateToYYYYMMDD(selectedDay),
          team_id: team.id,
        })
      );
    }
  }, [!!team, selectedDay]);

  return {
    selectedDay,
    setSelectedDay,
    teamLoading:
      loading === "FETCH_TEAM" || loading === "FETCH_TEAM_ACTIVITIES",
    team,
    isTeamOwner,
    teamActivities,
    userActivities,
    userLoading: userLoading === "FETCH_USER_ACTIVITIES",
  };
}
