import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseIcon from '../../icons/CloseIcon';

const StyledSnackbar = styled.div`
  width: 100%;
  background: #4f4f4f;
  border-radius: 4px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  margin-top: 10px;

  button {
    background-color: inherit;
    color: #ffffff;
    border: none;
    cursor: pointer;
  }
`;

const StyledSnackbarWithChildren = styled.div`
  div {
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
  children: PropTypes.node,
};

Snackbar.defaultProps = {
  onClose: undefined,
  message: '',
  children: undefined,
};

export default Snackbar;
