import errorIcon from "../assets/AlertIcons/error.svg";
import infoIcon from "../assets/AlertIcons/info.svg";
import successIcon from "../assets/AlertIcons/success.svg";
import warningIcon from "../assets/AlertIcons/warning.svg";

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
