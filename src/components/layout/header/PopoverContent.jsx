import { Divider, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from 'common/context/Auth/useAuth';
import { resetProfile, selectProfile } from 'features/profile/profileSlice';
import { LinkToDeleted } from './header-menu/LinkToDeleted';
import { LinkToFavorites } from './header-menu/LinkToFavorites';
import LinkToProfilePage from './header-menu/LinkToProfilePage';

const StyledMenuProfile = styled.div`
  line-height: 1.7;
  margin: 10px 0;
`;

const StyledMenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PopoverContent = () => {
  const { logout } = useAuth();

  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);

  const handleClick = () => {
    dispatch(resetProfile());
    logout();
  };

  return (
    <div>
      <div>@{profile.name}</div>
      <div role="presentation">
        <StyledMenuProfile>
          <Divider className="m-0" />
          <StyledMenuList>
            <li className="mt-2">
              <LinkToProfilePage />
            </li>
            <li>
              <LinkToFavorites />
            </li>
            <li className="mb-2">
              <LinkToDeleted />
            </li>
          </StyledMenuList>
          <Divider className="m-0" />
        </StyledMenuProfile>
        <Link
          to="/"
          className="d-none d-md-block"
          component={Typography.Link}
          onClick={handleClick}
        >
          Выйти
        </Link>
      </div>
    </div>
  );
};

export default PopoverContent;
