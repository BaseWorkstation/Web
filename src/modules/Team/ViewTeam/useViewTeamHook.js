import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMemberToTeam,
  deleteTeamMember,
  fetchTeamMembers,
  fetchTeam,
  fetchTeamById,
} from "redux/slices/teamSlice";
import { toastError, toastSuccess } from "utils/helpers";

const initialMemberDetails = {
  email: "",
};

export default function useViewTeamHook() {
  const [memberDetails, setMemberDetails] = useState(initialMemberDetails);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [teamInvitations, setTeamInvitations] = useState([]);
  const [joinedTeams, setJoinedTeams] = useState([]);
  const { team, teamMembers, loading } = useSelector((state) => state.teams);
  const { userDetails } = useSelector((state) => state.user);
  const addMemberModalState = useDisclosure();
  const deleteMemberModalState = useDisclosure();
  const dispatch = useDispatch();

  const currentTeamId = userDetails?.owned_teams[0];
  const isTeamOwner = !!userDetails?.owned_teams[0];
  const hasJoinedTeam = !!userDetails?.joined_teams[0];
  const hasInvitations = !!userDetails?.pending_team_invites[0];

  useEffect(() => {
    if (!team) {
      dispatch(fetchTeam({ id: currentTeamId }));
    }
  }, []);

  useEffect(() => {
    const fetchJoinedTeams = async () => {
      try {
        const teamsDetails = await Promise.all(
          userDetails?.joined_teams.map((teamId) => {
            return dispatch(fetchTeamById(teamId)).unwrap();
          })
        );

        setJoinedTeams(teamsDetails);
      } catch (error) {}
    };

    if (hasJoinedTeam) {
      fetchJoinedTeams();
    }
  }, []);

  useEffect(() => {
    const fetchInviteeTeams = async () => {
      try {
        const teamsDetails = await Promise.all(
          userDetails?.pending_team_invites.map((teamId) => {
            return dispatch(fetchTeamById(teamId)).unwrap();
          })
        );

        setTeamInvitations(teamsDetails);
      } catch (error) {}
    };

    if (hasInvitations) {
      fetchInviteeTeams();
    }
  }, []);

  useEffect(() => {
    if (team) {
      dispatch(
        fetchTeamMembers({
          team_id: currentTeamId,
        })
      );
    }
  }, [!!team]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberDetails({
      ...memberDetails,
      [name]: value,
    }); // onChange handler
  };

  const handleSubmitMember = async (event) => {
    event.preventDefault();

    try {
      await dispatch(
        addMemberToTeam({
          team_id: currentTeamId,
          emails: [
            {
              email_id: memberDetails.email,
            },
          ],
        })
      ).unwrap();

      toastSuccess("Team member has been successfully added");
      addMemberModalState.onClose();
      setMemberDetails(initialMemberDetails);
    } catch (error) {
      console.log(error);
      toastError(null, error);
    }
  };

  const openDeleteMemberConfirmation = (memberId) => {
    setMemberToRemove(memberId);
    deleteMemberModalState.onOpen();
  };

  const handleRemoveMember = async (event) => {
    event.preventDefault();

    try {
      await dispatch(
        deleteTeamMember({
          team_id: currentTeamId,
          user_id: memberToRemove,
        })
      ).unwrap();

      toastSuccess("Team member has been successfully removed");
      dispatch(
        fetchTeamMembers({
          team_id: currentTeamId,
        })
      );
      deleteMemberModalState.onClose();
    } catch (error) {
      toastError(null, error);
    }
  };

  return {
    teamLoading: loading === "FETCH_TEAM" || loading === "FETCH_TEAM_MEMBERS",
    isAddingMember: loading === "ADD_TEAM_MEMBER",
    isDeletingMember: loading === "DELETE_TEAM_MEMBER",
    currentTeam: team,
    isTeamOwner,
    hasJoinedTeam,
    joinedTeams,
    hasInvitations,
    teamInvitations,
    teamMembers,
    memberDetails,
    handleChange,
    handleSubmitMember,
    addMemberModalState,
    deleteMemberModalState,
    openDeleteMemberConfirmation,
    handleRemoveMember,
  };
}
