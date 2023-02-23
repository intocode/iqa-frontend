import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'common/context/Auth/useAuth';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledPopoverBlock = styled.div`
  width: 250px;
  text-align: center;
`;

const FavoritePopoverContent = ({ text }) => {
  const { executeLoggingInProcess } = useAuth();

  return (
    <StyledPopoverBlock>
      <Link to="/" onClick={executeLoggingInProcess}>
        Авторизуйся,
      </Link>{' '}
      {text}
    </StyledPopoverBlock>
  );
};

export default FavoritePopoverContent;

FavoritePopoverContent.propTypes = {
  text: PropTypes.node.isRequired,
};
