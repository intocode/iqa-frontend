import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSnackbarWrapper = styled.div`
  max-width: 500px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  word-break: break-all;
`;

const SnackbarWrapper = ({ children }) => {
  return <StyledSnackbarWrapper>{children}</StyledSnackbarWrapper>;
};

SnackbarWrapper.propTypes = {
  children: PropTypes.node,
};

SnackbarWrapper.defaultProps = {
  children: undefined,
};

export default SnackbarWrapper;
