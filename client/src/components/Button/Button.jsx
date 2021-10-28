import styled, { css } from "styled-components";
import PropTypes from "prop-types";
const Loading = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  &:after {
    content: " ";
    display: block;
    margin-top: 7px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 3px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StyledButton = styled.button`
  width: 100px;
  height: 40px;
  color: ${(props) => props.theme.colors[props.color].text};
  border: none;
  outlined: none;
  cursor: pointer;
  background-color: ${(props) => {
    return props.theme.colors[props.color].backgroundColor;
  }};
  ${(props) =>
    props.color === "light" &&
    css`
      color: black;
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
    `};

  ${(props) =>
    props.color === "primary" &&
    !props.contrast &&
    css`
      color: #409eff;
      background-color: #d9ecff;
      box-shadow: #409eff 0px 0px 0px 1px inset;
    `}};
    
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
  line-height: 40px;
  border-radius: ${(props) => (props.rounded ? "24px" : "4px")};
  &[disabled] {
    opacity: 0.5;
  }
`;

export const Button = ({ children, disabled, loading, ...props }) => {
  return (
    <StyledButton {...props} disabled={disabled || loading}>
      {loading ? (
        <>
          <Loading /> Loading
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  contrast: PropTypes.bool,
  color: PropTypes.oneOf([
    "danger",
    "primary",
    "secondary",
    "warning",
    "success",
  ]),
  rounded: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  color: "primary",
};
