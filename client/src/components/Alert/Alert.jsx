import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import closeIcon from "../../assets/close.svg";

const StyledAlert = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;

  color: ${(props) => props.theme.colors[props.color].main};
  background-color: ${(props) => {
    return props.theme.colors[props.color].addition;
  }};

  // fixme заменить на бордер
  box-shadow: ${(props) => props.theme.colors[props.color].main} 0 0 0 1px inset;

  border-radius: 4px;

  // инверсия цветов для contrast=true
  ${(props) => {
    if (props.contrast) {
      return css`
        color: white;
        background-color: ${(props) => props.theme.colors[props.color].main};
      `;
    }
  }}
`;

export const Alert = ({ children, icon, onClose, ...props }) => {
  console.log(onClose);
  return (
    <StyledAlert {...props}>
      <div>
        {icon} {children}
      </div>
      {onClose && (
        // fixme заменить div на button,
        //  сделать cursor: pointer, сделать цвет икса как у текста
        <div onClick={onClose}>
          <img src={closeIcon} alt="" />
        </div>
      )}
    </StyledAlert>
  );
};

Alert.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.string.isRequired,
  contrast: PropTypes.bool,
  color: PropTypes.oneOf(["danger", "gray", "warning", "success"]),
  onClose: PropTypes.func,
};

Alert.defaultProps = {
  icon: null,
  color: "success",
  onClose: undefined,
};
