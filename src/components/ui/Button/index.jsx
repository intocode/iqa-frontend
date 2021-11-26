import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { AVAILABLE_THEME_COLORS, DEFAULT_COLOR } from '../../../app/constants';

const StyledLoading = styled.div`
  display: inline-block;
  margin-right: 8px;
  position: relative;
  margin-top: 2px;
  width: 11px;
  height: 11px;
  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 11px;
    height: 11px;
    border: 1px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  & > div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & > div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & > div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
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
        <StyledLoading>
          <div />
          <div />
          <div />
          <div />
        </StyledLoading>
        {children}
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
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  contrast: PropTypes.bool,
  color: PropTypes.oneOf(AVAILABLE_THEME_COLORS),
  rounded: PropTypes.bool,
};

Button.defaultProps = {
  startIcon: null,
  disabled: false,
  loading: false,
  contrast: true,
  rounded: false,
  color: DEFAULT_COLOR,
};
