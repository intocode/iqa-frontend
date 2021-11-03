import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledLoading = styled.div`
  display: inline-block;
  &::after {
    content: ' ';
    display: block;
    margin-right: 5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 3px solid;
    border-color: #66b3ff transparent;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;

  border: 1px solid ${(props) => props.theme.colors[props.color].main};
  border-radius: ${(props) => (props.rounded ? '24px' : '4px')};

  outline: none;
  cursor: pointer;
  line-height: 20px;

  ${(props) => {
    if (props.contrast) {
      return css`
        color: white;
        background-color: ${props.theme.colors[props.color].main};
      `;
    }

    return css`
      color: ${props.theme.colors[props.color].main};
      background-color: ${props.theme.colors[props.color].addition};
    `;
  }}

  &[disabled] {
    opacity: 0.5;
  }
  & .start-icon {
    display: inherit;
    margin-right: 5px;

    & svg {
      height: 20px;
      width: 20px;
    }
  }
`;

export const Button = ({
  children,
  disabled,
  loading,
  startIcon,
  ...props
}) => (
  <StyledButton {...props} disabled={disabled || loading}>
    {loading ? (
      <>
        <StyledLoading /> {children}
      </>
    ) : (
      <>
        {startIcon && <span className="start-icon">{startIcon}</span>}
        {children}
      </>
    )}
  </StyledButton>
);

Button.propTypes = {
  startIcon: PropTypes.element,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  contrast: PropTypes.bool,
  color: PropTypes.oneOf(['danger', 'gray', 'warning', 'success']),
  rounded: PropTypes.bool,
};

Button.defaultProps = {
  startIcon: null,
  disabled: false,
  loading: false,
  contrast: false,
  rounded: false,
  color: 'success',
};
