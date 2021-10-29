import errorIcon from "../../assets/alert-icons/error.svg";
import infoIcon from "../../assets/alert-icons/info.svg";
import successIcon from "../../assets/alert-icons/success.svg";
import warningIcon from "../../assets/alert-icons/warning.svg";

export const IconAlert = ({ color }) => {
  const icon =
    color === "success"
      ? successIcon
      : color === "danger"
      ? errorIcon
      : color === "warning"
      ? warningIcon
      : color === "secondary"
      ? infoIcon
      : "";
  return <img src={icon} alt="" />;
};
