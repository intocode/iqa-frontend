import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseIcon from '../../icons/CloseIcon';

const StyledSnackbar = styled.div`
  width: 397px;
  height: 60px;
  background: #4f4f4f;
  border-radius: 4px;
  color: #ffffff;
  position: fixed;
  bottom: 20px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;

  button {
    background-color: inherit;
    color: #ffffff;
    border: none;
    cursor: pointer;
  }
`;

const StyledSnackbarWithChildren = styled.div`
  width: 397px;
  height: 60px;
  position: fixed;
  bottom: 20px;
  right: 10px;

  div {
    width: 100%;
    height: 100%;

    button {
      color: black;
    }
  }
`;

const Snackbar = ({ onClose, message, children }) => {
  return children ? (
    <StyledSnackbarWithChildren>{children}</StyledSnackbarWithChildren>
  ) : (
    <StyledSnackbar>
      {message}
      {onClose && (
        <button type="button" onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </StyledSnackbar>
  );
};

Snackbar.propTypes = {
  onClose: PropTypes.func,
  message: PropTypes.string,
  children: PropTypes.func,
};

Snackbar.defaultProps = {
  onClose: undefined,
  message: '',
  children: undefined,
};

export default Snackbar;
