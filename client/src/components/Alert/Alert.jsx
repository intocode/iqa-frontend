import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import closeIcon from "../assets/close.svg";
import { IconAlert } from "./Icon.Alert";

const StyledAlert = styled.div`
  width: 460px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors[props.color].text};
  padding: 0px 15px 0px 15px;
  background-color: ${(props) => {
    return props.theme.colors[props.color].backgroundColor;
  }};

  ${(props) =>
    props.color === "success" &&
    !props.contrast &&
    css`
      color: #67c23a;
      background-color: #f0f9eb;
      box-shadow: #67c23a 0px 0px 0px 1px inset;
    `}};

  ${(props) =>
    props.color === "danger" &&
    !props.contrast &&
    css`
      color: #f56c6c;
      background-color: #fef0f0;
      box-shadow: #f56c6c 0px 0px 0px 1px inset;
    `}};

  ${(props) =>
    props.color === "secondary" &&
    !props.contrast &&
    css`
      color: #909399;
      background-color: #f4f4f5;
      box-shadow: #909399 0px 0px 0px 1px inset;
    `}};

   ${(props) =>
     props.color === "warning" &&
     !props.contrast &&
     css`
       color: #e6a23c;
       background-color: #fdf6ec;
       box-shadow: #e6a23c 0px 0px 0px 1px inset;
     `}};
  line-height: 36px;
  border-radius: 4px;
  &[disabled] {
    opacity: 0.5;
  }
`;

export const Alert = ({
  children,
  icon,
  onClose,
  disabled,
  loading,
  ...props
}) => {
  icon = <IconAlert color={props.color} />;
  return (
    <StyledAlert {...props} disabled={disabled || loading}>
      <div>
        {icon} {children}
      </div>
      {onClose && (
        <div>
          <img src={closeIcon} alt="" />
        </div>
      )}
    </StyledAlert>
  );
};

Alert.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  contrast: PropTypes.bool,
  color: PropTypes.oneOf([
    "danger",
    "primary",
    "secondary",
    "warning",
    "success",
  ]),
};

Alert.defaultProps = {
  disabled: false,
  color: "success",
};
