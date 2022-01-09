import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectProfile } from '../profile/profileSlice';
import { Button, Rate } from '../../components/ui';

const StyledQuestionsBlock = styled.div`
  display: flex;
  margin-top: 30px;

  & > div > img {
    margin-right: 15px;
    border-radius: 24px;
  }
`;
const StyledTextArea = styled.textarea`
  width: 700px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  margin-bottom: 10px;
  padding: 15px;
  &::-webkit-input-placeholder {
    color: rgba(192, 196, 204, 1);
  }
  font-family: Noto Sans Sc;
  font-size: 14px;
`;
const StyledProfile = styled.div`
  display: flex;
  align-items: center;

  & > img {
    width: 36px;
    height: 36px;
    border-radius: 24px;
    margin-right: 10px;
  }
`;

const StyledCommentText = styled.div`
  margin-top: 15px;
  font-family: Inter;
  font-size: 16px;
`;

const StyledTimeStamps = styled.p`
  font-size: 12px;
  color: #909399;
`;

const QuestionComments = () => {
  const profile = useSelector(selectProfile);

  return (
    <div className="container my-4">
      <h3>Комментарии (4)</h3>
      <StyledQuestionsBlock>
        <div>
          <img src={profile.avatar?.thumbnail} alt="" />
        </div>
        <div>
          <StyledTextArea placeholder="Формулировка вопроса..." />
          <Button>Опубликовать</Button>
        </div>
      </StyledQuestionsBlock>
      <div className="row align-items-center my-4">
        <div className="col">
          <StyledProfile>
            <img src={profile.avatar?.thumbnail} alt="" />
            <div>
              <p>{profile.name}</p>
              <StyledTimeStamps>time</StyledTimeStamps>
            </div>
          </StyledProfile>
        </div>
        <div className="col-auto">
          <Rate />
        </div>
        <StyledCommentText>
          Не согласен с этими выводами категорически! Баб!
        </StyledCommentText>
      </div>
    </div>
  );
};

export default QuestionComments;
