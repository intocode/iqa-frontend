import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { Paper } from 'components/layout/Paper';
import { theme } from 'app/theme';
import { selectProfile } from './profileSlice';

const ProfileUser = () => {
  const profile = useSelector(selectProfile);

  const StyledAvatar = styled.div`
    & > img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      cursor: pointer;
    }
    @media screen and (max-width: 576px) {
      & > img {
        margin: auto;
        border-radius: 50%;
      }
    }
  `;

  const StyledPageUser = styled.div`
    .pageUser {
      margin-left: -20px;
    }
    .registration-date {
      color: ${theme.colors.gray.main};
      font-size: 12px;
    }
    .nameUser {
      font-size: 22px;
    }
    .userName {
      font-size: 20px;
      font-weight: 400;
      margin-top: 20px;
    }
    .userEmail {
      margin-top: 20px;
      font-size: 20px;
    }
    .userData {
      margin: 20px 0 26px 20px;
    }
  `;

  return (
    <div className="container">
      <StyledPageUser>
        <div className="row flex-column flex-sm-row">
          <div className="col-12 col-sm-4 mt-3">
            <span className="nameUser">Профиль @{profile.name}</span>
            <StyledAvatar className="d-flex justify-content-center mt-3">
              <img className="mt-auto" src={profile.avatar?.full} alt="" />
            </StyledAvatar>
          </div>
          <div className="col-12 col-sm-8 mt-sm-5 mt-3">
            <Paper className="pageUser">
              <div className="userData">
                <div className="registration-date">
                  Зарегистрирован {dayjs(profile.createdAt).fromNow()}
                </div>
                <div className="userName">
                  {profile.fullName ? profile.fullName : `User ${profile._id}`}
                </div>
                <div className="userEmail">{profile.email}</div>
              </div>
            </Paper>
          </div>
        </div>
      </StyledPageUser>
    </div>
  );
};

export default ProfileUser;
