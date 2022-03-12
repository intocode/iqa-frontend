import React, { useCallback, useEffect, useMemo } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useAuth } from '../../common/context/Auth/useAuth';
import { Button } from '../ui';

const StyledMenu = styled.ul`
  list-style: none;
  position: absolute;
  width: 75%;
  min-height: 100vh;
  top: 80px;
  background-color: #f8f9fa;
  box-shadow: 200px -4px 0px -5px rgba(0, 0, 0, 0.31);

  li {
    padding: 15px 0;
  }
`;

const AdaptiveMenu = ({ toggleMobileMenu, mobileMenu }) => {
  const location = useLocation();
  const history = useHistory();
  const { token, executeLoggingInProcess, logout } = useAuth();

  const handleAddQuestion = useCallback(() => {
    history.push('/create');
  }, [history]);

  useEffect(() => {
    if (mobileMenu) {
      toggleMobileMenu();
    }
  }, [location.key]); //eslint-disable-line

  const menuItems = useMemo(() => {
    return [
      {
        id: 1,
        protected: true,
        jsx: (
          <Button
            className="d-block mb-2"
            contrast={false}
            color="primary"
            onClick={handleAddQuestion}
          >
            Опубликовать опрос
          </Button>
        ),
      },
      {
        id: 2,
        protected: true,
        jsx: (
          <div>
            <Link to="/favorites">Избранные</Link>
          </div>
        ),
      },
      {
        id: 3,
        jsx: <Link to="/cart">Корзина</Link>,
      },
      {
        id: 4,
        protected: true,
        jsx: (
          <Link to="/" onClick={logout}>
            Выйти
          </Link>
        ),
      },
      {
        id: 5,
        guest: true,
        jsx: (
          <Button
            className="d-block m-auto"
            contrast={false}
            color="primary"
            onClick={executeLoggingInProcess}
          >
            Login with GitHub
          </Button>
        ),
      },
    ].filter((item) => {
      if (item.protected) {
        return !!token;
      }

      if (item.guest) {
        return !token;
      }

      return true;
    });
  }, [executeLoggingInProcess, handleAddQuestion, logout, token]);

  if (!mobileMenu) return null;

  return (
    <StyledMenu className="d-md-none">
      {menuItems.map((item) => (
        <React.Fragment key={item.id}>
          <li>{item.jsx}</li>
        </React.Fragment>
      ))}
    </StyledMenu>
  );
};

AdaptiveMenu.propTypes = {
  toggleMobileMenu: PropTypes.func.isRequired,
  mobileMenu: PropTypes.bool.isRequired,
};

export default AdaptiveMenu;
