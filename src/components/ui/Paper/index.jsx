import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledPaper = styled.div`
  background-color: #fff;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const Paper = ({ children, ...props }) => <StyledPaper {...props}>{children}</StyledPaper>;

Paper.propTypes = {
  children: PropTypes.node.isRequired,
};
