import { createStandaloneToast } from "@chakra-ui/toast";
const { toast } = createStandaloneToast();
import moment from "moment";
import "moment-timezone";

export const separateWithComma = (number) => {
  // Separate number with commas
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
};

const getErrorMessage = (error) => {
  if (error.status == 422) {
    const errorKey = Object.keys(error?.data?.errors)?.[0];
    const errorMessage = error?.data?.errors?.[errorKey]?.[0];

    return `${errorKey}: ${errorMessage}`;
  } else if (error.status == 401) {
    return error?.data?.error;
  } else if (error.status == 400 || error.status == 403) {
    return error?.data?.message;
  } else {
    return error?.data?.message || "Kindly try again later";
  }
};

export const toastError = (title, error, description, stay) => {
  // Trigger Chakra UI error toast
  toast({
    status: "error",
    title: title || "Error",
    description: description || getErrorMessage(error),
    duration: stay ? null : 4000,
    position: "top",
    variant: "top-accent",
  });
};

export const toastSuccess = (title, description, stay) => {
  // Trigger Chakra UI success toast
  toast({
    status: "success",
    title: title || "Successful!",
    description: description || "",
    duration: stay ? null : 4000,
    position: "top",
    variant: "top-accent",
  });
};

/** Format/Shorten a specified number using "k" */
export const kConvert = (number) => {
  if (number < 1e3) return number;
  if (number >= 1e3) return +(number / 1e3).toFixed(1) + "k";
};

/**  To format a date string to dd-mm-yyyy or yyyy-mm-dd */
export const formatDateToYYYYMMDD = (date, format) => {
  var today = date ? new Date(date) : new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return format === "dd-mm-yyyy"
    ? `${dd}-${mm}-${yyyy}`
    : `${yyyy}-${mm}-${dd}`;
};

/** Accepts two timestamps in hh:mm:ss format and returns whether the current user's time is within
 * the range of the timestamps
 *
 * @param {string} startTime
 * @param {string} endTime
 *
 * @returns {boolean} result
 */
export const checkIfCurrentTimeIsBetweenRange = (startTime, endTime) => {
  const isAfterStartTime = moment().isSameOrAfter(
    moment(startTime, "hh:mm:ss")
  );
  const isBeforeEndTime = moment().isSameOrBefore(moment(endTime, "hh:mm:ss"));

  return isAfterStartTime && isBeforeEndTime;
};

export const convertMinutesToHHMMSS = (minutes) => {
  const m = minutes % 60;

  const h = (minutes - m) / 60;

  const HHMMSS =
    (h < 10 ? "0" : "") +
    h.toString() +
    ":" +
    (m < 10 ? "0" : "") +
    m.toString() +
    ":00";

  return HHMMSS;
};
