import React, { useState, useRef } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
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

  Button {
    margin-top: 10px;
  }
`;

const AddComment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const editorRef = useRef();

  const profile = useSelector(selectProfile);
  const question = useSelector(selectQuestions);
  const commentsLoading = useSelector(selectCommentsAdding);

  const [text, setText] = useState('');

  const handleChange = () => {
    const instance = editorRef.current.getInstance();
    setText(instance.getMarkdown());
  };

  const handleAddComment = () => {
    dispatch(addCommentToPost({ text, id })).then(() => {
      setText('');
      editorRef.current.getInstance().reset();
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
        <Editor
          previewStyle="vertical"
          height="150px"
          initialEditType="wysiwyg"
          useCommandShortcut
          usageStatistics={false}
          hideModeSwitch
          value={text}
          onChange={handleChange}
          ref={editorRef}
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote', 'code', 'codeblock'],
          ]}
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
