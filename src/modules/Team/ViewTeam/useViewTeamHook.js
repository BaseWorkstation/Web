import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMemberToTeam,
  deleteTeamMember,
  fetchTeamMembers,
  fetchTeam,
} from "redux/slices/teamSlice";
import { toastError, toastSuccess } from "utils/helpers";

const initialMemberDetails = {
  email: "",
};

export default function useViewTeamHook() {
  const [memberDetails, setMemberDetails] = useState(initialMemberDetails);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const { team, teamMembers, loading } = useSelector((state) => state.teams);
  const { userDetails } = useSelector((state) => state.user);
  const addMemberModalState = useDisclosure();
  const deleteMemberModalState = useDisclosure();
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
