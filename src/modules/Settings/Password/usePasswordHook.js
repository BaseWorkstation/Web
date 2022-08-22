import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPassword } from "redux/slices/userSlice";
import { toastError, toastSuccess } from "utils/helpers";

const initialPasswordDetails = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function usePasswordHook() {
  const [passwordDetails, setPasswordDetails] = useState(
    initialPasswordDetails
  );
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswordDetails({
      ...passwordDetails,
      [name]: value,
    }); // onChange handler
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(
        changeUserPassword({
          old_password: passwordDetails.oldPassword,
          password: passwordDetails.newPassword,
          password_confirmation: passwordDetails.confirmNewPassword,
        })
      ).unwrap();

      toastSuccess(
        "Your password has been successfully changed",
        "Use this new password the next time you want to log in"
      );
    } catch (error) {
      toastError(null, error);
    }
  };

  return {
    passwordDetails,
    handleChange,
    handleSubmit,
    isLoading: loading === "CHANGE_USER_PASSWORD",
  };
}
