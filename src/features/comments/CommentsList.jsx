import React from 'react';
import { useSelector } from 'react-redux';
import { commentsSelectors } from './commentsSlice';
import { CommentItem } from './CommentItem';

const CommentsList = () => {
  const commentIds = useSelector(commentsSelectors.selectIds);

  return (
    <>
      {commentIds.map((commentId) => {
        return <CommentItem key={commentId} commentId={commentId} />;
      })}
    </>
  );
};

export default CommentsList;
