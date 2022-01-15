import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledSwitch = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  height: 20px;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  color: #409eff;

  input {
    display: none;
  }

  span {
    width: 40px;
    height: 20px;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #909399;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: '';
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }

    ${(props) =>
      props.turnedOn &&
      css`
        background: #409eff;
        &:before {
          transform: translateX(20px);
        }
      `}
  }
`;

const StyledSwitchText = styled.div`
  margin-left: 50px;
`;

export const Switch = ({ children, ...props }) => {
  return (
    <StyledSwitch {...props}>
      <input type="checkbox" disabled={props.disabled} />
      <span />
      <StyledSwitchText>{children}</StyledSwitchText>
    </StyledSwitch>
  );
};

Switch.propTypes = {
  turnedOn: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.string,
};

Switch.defaultProps = {
  turnedOn: false,
  disabled: false,
  children: null,
};
