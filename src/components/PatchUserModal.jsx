import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile, updateProfile } from 'features/profile/profileSlice';
import styled from 'styled-components';
import { useAuth } from 'common/context/Auth/useAuth';

const StyledModalHeading = styled.h2`
  text-align: center;
`;
const StyledButtonBlock = styled.div`
  width: 110px;
  margin: auto;
`;

const PatchUserModal = () => {
  const profile = useSelector(selectProfile);

  const { token } = useAuth();

  const dispatch = useDispatch();

  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const id = profile._id;

  const handleSubmit = () => {
    dispatch(updateProfile({ id, userFullName, userEmail }));
  };

  const isModalOpened = !profile.fullName || !profile.email;

  if (!token || profile.loading) return null;

  return (
    <div>
      <Modal open={isModalOpened} footer={null} destroyOnClose>
        <div>
          <StyledModalHeading>Введите полное имя и почту, что бы продолжить</StyledModalHeading>
          <div className="mt-3">
            {!profile.fullName && (
              <Input
                value={userFullName}
                onChange={(e) => setUserFullName(e.target.value)}
                type="text"
                placeholder="Введите имя и фамилию"
              />
            )}
            {!profile.email && (
              <Input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                type="text"
                placeholder="Введите Email"
                className="mt-2"
              />
            )}
            <StyledButtonBlock>
              <Button
                className="mt-3"
                disabled={!userFullName}
                onClick={handleSubmit}
                type="button"
              >
                Сохранить
              </Button>
            </StyledButtonBlock>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PatchUserModal;
