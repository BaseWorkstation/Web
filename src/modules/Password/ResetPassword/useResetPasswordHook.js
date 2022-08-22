import Axios from "axios";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import { toastError, toastSuccess } from "utils/helpers";
import { BASE_API_URL } from "utils/constants";

const initialResetPasswordDetails = {
  password: "",
  confirmPassword: "",
};

export default function useResetPasswordHook() {
  const [resetPasswordDetails, setResetPasswordDetails] = useState(
    initialResetPasswordDetails
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useRouter();
  const { password, confirmPassword } = resetPasswordDetails;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResetPasswordDetails({
      ...resetPasswordDetails,
      [name]: value,
    }); // onChange handler
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toastError("Passwords do not match", null, "Please check and try again");
      return;
    }

    setIsLoading(true);
    Axios.post(BASE_API_URL + "/reset-password", {
      password: password,
      password_confirmation: confirmPassword,
      token: query.token,
      email: query.email,
    })
      .then(({ data }) => {
        console.log(data);
        toastSuccess("Password updated successfully!");
        Router.push("/login");
      })
      .catch(({ response }) => {
        setIsLoading(false);
        console.log(response);
        toastError("Unable to set new password", response);
      });
  };

  return {
    resetPasswordDetails,
    setResetPasswordDetails,
    isLoading,
    handleSubmit,
    handleChange,
    showPassword,
    setShowPassword,
  };
}
