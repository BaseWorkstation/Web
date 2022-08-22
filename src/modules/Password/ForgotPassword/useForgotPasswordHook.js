import Axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toastError, toastSuccess } from "utils/helpers";
import { BASE_API_URL } from "../../../utils/constants";

const initialForgotPasswordDetails = {
  email: "",
};

export default function useForgotPasswordHook() {
  const [forgotPasswordDetails, setForgotPasswordDetails] = useState(
    initialForgotPasswordDetails
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForgotPasswordDetails({
      ...forgotPasswordDetails,
      [name]: value,
    }); // onChange handler
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);
    Axios.post(BASE_API_URL + "/forgot-password", forgotPasswordDetails)
      .then(({ data }) => {
        console.log(data);
        toastSuccess(
          "A confirmation link has been sent to your email",
          "Kindly follow the instructions to change your password"
        );
        setIsLoading(false);
        setForgotPasswordDetails(initialForgotPasswordDetails);
      })
      .catch(({ response }) => {
        setIsLoading(false);
        console.log(response);
        toastError("Unable to send link", response);
      });
  };

  return {
    forgotPasswordDetails,
    setForgotPasswordDetails,
    isLoading,
    handleSubmit,
    handleChange,
  };
}
