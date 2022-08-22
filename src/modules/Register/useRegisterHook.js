import Axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "redux/slices/userSlice";
import { BASE_API_URL } from "utils/constants";
import { toastError } from "utils/helpers";

const initialRegisterDetails = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  password: "",
  areTermsAgreed: false,
};

export default function useRegisterHook() {
  // Initialize registration details
  const [registerDetails, setRegisterDetails] = useState(
    initialRegisterDetails
  );
  // Initial signup stage where the user can input his/her details
  const [stage, setStage] = useState("INPUT_DETAILS");
  const [basePin, setBasePin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterDetails((prev) => ({
      ...prev,
      [name]: value,
    })); // onChange handler
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);
    Axios.post(BASE_API_URL + "/register", {
      first_name: registerDetails.first_name,
      last_name: registerDetails.last_name,
      phone: registerDetails.phone,
      email: registerDetails.email,
      password: registerDetails.password,
      password_confirmation: registerDetails.password,
    })
      .then(({ data }) => {
        localStorage.setItem("base_acccess_token", data?.token);
        dispatch(setUserDetails(data.user));
        setBasePin(data.user.unique_pin); // Save user base pin
        setStage("SHOW_PIN"); // Show the user his/her base pin
      })
      .catch(({ response }) => {
        toastError("Unable to sign up", response);
        setIsLoading(false);
        console.log(response);
      });
  };

  return {
    registerDetails,
    setRegisterDetails,
    stage,
    isLoading,
    handleSubmit,
    handleChange,
    showPassword,
    setShowPassword,
    basePin,
  };
}
