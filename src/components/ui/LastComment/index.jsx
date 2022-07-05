import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 25px;
  & > div {
    margin-bottom: 0 !important;
  }
`;

export const LastComment = ({ children, ...props }) => (
  <StyledWrapper {...props}>{children}</StyledWrapper>
);

LastComment.propTypes = {
  children: PropTypes.node.isRequired,
};
