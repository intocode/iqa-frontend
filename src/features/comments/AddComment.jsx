import React, { useState, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'antd';
import { selectProfile } from 'features/profile/profileSlice';
import { addComment, selectCommentsAdding } from './commentsSlice';

const StyledAvatar = styled.img`
  width: 48px;
  border-radius: 50%;
`;

const AddComment = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const editorRef = useRef();

  const profile = useSelector(selectProfile);
  const commentAdding = useSelector(selectCommentsAdding);

  const [text, setText] = useState('');

  const handleChange = () => {
    const instance = editorRef.current.getInstance();
    setText(instance.getMarkdown());
  };

  const handleAddComment = () => {
    dispatch(addComment({ text, id })).then(() => {
      setText('');
      editorRef.current.getInstance().reset();
    });
  };

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote', 'code', 'codeblock'],
  ];

  return (
    <div>
      <div className="row mb-3">
        <div className="col-auto">
          <StyledAvatar src={profile.avatar?.thumbnail} alt="аватарка" />
        </div>
        <div className="col">
          <Editor
            theme="iqa"
            autofocus={false}
            previewStyle="vertical"
            height="150px"
            initialEditType="wysiwyg"
            useCommandShortcut
            usageStatistics={false} // from docs
            hideModeSwitch
            value={text}
            onChange={handleChange}
            ref={editorRef}
            toolbarItems={toolbarItems}
          />
          <Button
            className="mt-3"
            loading={commentAdding}
            onClick={handleAddComment}
            disabled={!/[^\s]/.test(text)}
          >
            Опубликовать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
