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
        <div className="row">
          <div className="col-4 mt-3">
            <span className="nameUser">Профиль @{profile.name}</span>
            <StyledAvatar>
              <img className="m-auto mt-3" src={profile.avatar?.full} alt="" />
            </StyledAvatar>
          </div>
          <div className="col-8 mt-5">
            <Paper className="pageUser">
              <div className="userData">
                <div className="registration-date">
                  Зарегистрирован {dayjs(profile.createdAt).fromNow()}
                </div>
                <div className="userName">Атамазов Насырбек</div>
                <div className="userEmail">atamazov00@mail.ru</div>
              </div>
            </Paper>
          </div>
        </div>
      </StyledPageUser>
    </div>
  );
};

export default ProfileUser;
