import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

  const profile = useSelector(selectProfile);
  const commentAdding = useSelector(selectCommentsAdding);

  const [text, setText] = useState('');

  const handleAddComment = () => {
    dispatch(addComment({ text, id }));
    setText('');
  };

  const handleChange = (_, editor) => {
    setText(String(editor.getData(String).slice(3, -4)));
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
          <CKEditor
            editor={ClassicEditor}
            value={text}
            onChange={handleChange}
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
