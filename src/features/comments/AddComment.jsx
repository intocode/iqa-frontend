import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/ui';
import { selectQuestions } from '../questions/questionsSlice';
import {
  addCommentToPost,
  resetCommentSuccess,
  selectCommentsAdding,
} from './commentsSlice';
import { selectProfile } from '../profile/profileSlice';

const StyledQuestionsBlock = styled.div`
  display: flex;
  margin-top: 30px;
  padding: 0 10px;

  & > div > img {
    margin-right: 15px;
    border-radius: 24px;
  }
`;
const StyledTextArea = styled.textarea`
  width: 100%;
  max-width: 700px;
  height: 100px;
  min-height: 50px;
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

const AddComment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const question = useSelector(selectQuestions);
  const commentsLoading = useSelector(selectCommentsAdding);

  const [text, setText] = useState('');

  const handleAddComment = () => {
    dispatch(addCommentToPost({ text, id })).then(() => {
      setText('');
    });
    setTimeout(() => {
      dispatch(resetCommentSuccess());
    }, 10000);
  };

  return (
    <StyledQuestionsBlock>
      <div>
        <img src={profile.avatar?.thumbnail} alt="" />
      </div>
      <div className="flex-grow-1">
        <StyledTextArea
          onChange={(e) => setText(e.target.value)}
          placeholder="Формулировка вопроса..."
          value={text}
        />
        <Button
          loading={commentsLoading}
          onClick={handleAddComment}
          disabled={!question.length || !/[^\s]/.test(text)}
        >
          Опубликовать
        </Button>
      </div>
    </StyledQuestionsBlock>
  );
};

export default AddComment;
