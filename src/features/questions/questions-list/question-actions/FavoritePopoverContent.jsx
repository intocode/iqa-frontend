import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'common/context/Auth/useAuth';
import styled from 'styled-components';

const StyledPopoverBlock = styled.div`
  width: 250px;
  text-align: center;
`;

const FavoritePopoverContent = () => {
  const { executeLoggingInProcess } = useAuth();

  return (
    <StyledPopoverBlock>
      <Link to="/" onClick={executeLoggingInProcess}>
        Авторизуйся,
      </Link>{' '}
      чтобы иметь возможность сохранять вопросы
    </StyledPopoverBlock>
  );
};

export default FavoritePopoverContent;
