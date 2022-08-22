import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastError, toastSuccess } from "utils/helpers";
import { editUserDetails, uploadUserAvatar } from "redux/slices/userSlice";
import { editTeam, fetchTeams, uploadTeamImage } from "redux/slices/teamSlice";

export default function useBasicInfoHook() {
  const { userDetails, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { teams, loading: teamsLoading } = useSelector((state) => state.teams);
  const currentTeam = teams[0];

  const [basicInfoDetails, setBasicInfoDetails] = useState({
    firstName: userDetails.first_name,
    lastName: userDetails.last_name,
    address: userDetails.address,
    phone: userDetails.phone,
    teamName: currentTeam?.name,
    teamAddress: currentTeam?.address,
    teamEmail: currentTeam?.address,
    teamPhone: currentTeam?.phone,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!teams.length) {
        try {
          const data = await dispatch(fetchTeams()).unwrap();
          setBasicInfoDetails((prev) => ({
            ...prev,
            teamName: data[0]?.name,
            teamAddress: data[0]?.address,
            teamEmail: data[0]?.address,
            teamPhone: data[0]?.phone,
          }));
        } catch (error) {}
      }
    })();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBasicInfoDetails({
      ...basicInfoDetails,
      [name]: value,
    }); // onChange handler
  };

  const handleUserInfoSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(
        editUserDetails({
          userId: userDetails.id,
          payload: {
            first_name: basicInfoDetails.firstName,
            last_name: basicInfoDetails.lastName,
            address: basicInfoDetails.address,
            phone: basicInfoDetails.phone,
          },
        })
      ).unwrap();
      toastSuccess("Saved successfully");
    } catch (error) {
      toastError(null, error);
    }
  };

  const handleTeamInfoSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(
        editTeam({
          id: currentTeam?.id,
          name: basicInfoDetails.teamName,
          email: basicInfoDetails.teamEmail,
          phone: basicInfoDetails.teamPhone,
          address: basicInfoDetails.teamAddress,
        })
      ).unwrap();
      toastSuccess("Saved successfully");
    } catch (error) {
      toastError(null, error);
    }
  };

  const handleUploadUserImage = async (event, owner) => {
    const imageFile = event.target.files[0];
    if (!imageFile) {
      return;
    }
    const formData = new FormData();
    // append the details of the form data
    formData.append("upload_category", "user_avatar");
    formData.append("user_id", userDetails.id);
    // append the file
    formData.append("file", imageFile);

    try {
      await dispatch(uploadUserAvatar(formData)).unwrap();
    } catch (error) {
      toastError(null, error);
    }

    event.target.value = "";
  };

  const handleUploadTeamImage = async (event, owner) => {
    const imageFile = event.target.files[0];
    if (!imageFile) {
      return;
    }
    const formData = new FormData();
    // append the details of the form data
    formData.append("upload_category", "team_logo");
    formData.append("team_id", currentTeam.id);
    // append the file
    formData.append("file", imageFile);

    try {
      await dispatch(uploadTeamImage(formData)).unwrap();
    } catch (error) {
      toastError(null, error);
    }

    event.target.value = "";
  };

  return {
    basicInfoDetails,
    handleChange,
    handleUserInfoSubmit,
    currentTeam,
    isUserInfoLoading: userLoading,
    handleTeamInfoSubmit,
    isTeamInfoLoading: teamsLoading,
    handleUploadTeamImage,
    handleUploadUserImage,
  };
}
