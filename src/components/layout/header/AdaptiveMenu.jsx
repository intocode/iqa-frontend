import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';
import { useAuth } from 'common/context/Auth/useAuth';
import { useSelector } from 'react-redux';
import { selectProfile } from 'features/profile/profileSlice';

const StyledMenu = styled.ul`
  list-style: none;
  position: absolute;
  width: 75%;
  min-height: 100vh;
  top: 80px;
  background-color: #f8f9fa;
  box-shadow: 200px -4px 0px -5px rgba(0, 0, 0, 0.31);
  z-index: 1;

  li {
    padding: 15px 0;
  }
`;

const StyledAvatar = styled.div`
  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const Line = styled.hr`
  margin-top: 10px;
  width: 90%;
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
`;

const AdaptiveMenu = ({ toggleMobileMenu, mobileMenu }) => {
  const location = useLocation();
  const { token, executeLoggingInProcess, logout } = useAuth();
  const profile = useSelector(selectProfile);

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
          <>
            <Link to="/profile">
              <div className="d-flex align-items-center">
                <StyledAvatar>
                  <img className="m-auto" src={profile.avatar?.thumbnail} alt="" />
                </StyledAvatar>
                <span className="nameUser mx-2">Профиль @{profile.name}</span>
              </div>
            </Link>
            <Line />
          </>
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
        protected: true,
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
          <Button className="d-block m-auto" color="primary" onClick={executeLoggingInProcess}>
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
  }, [executeLoggingInProcess, logout, profile, token]);

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
