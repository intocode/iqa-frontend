import React, { lazy, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchComments,
  selectComments,
  selectCommentsLoading,
} from './commentsSlice';
import { useAuth } from '../../common/context/Auth/useAuth';
import CommentsList from './CommentsList';
import { CommentsPlaceholder } from './CommentsPlaceholder';

const AddComment = lazy(() => import('./AddComment'));

const CommentsByQuestion = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();

  const comments = useSelector(selectComments);
  const loading = useSelector(selectCommentsLoading);

  const ref = useRef(null);

  if (ref.current) ref.current.scrollIntoView();

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  return (
    <div id="scroll" ref={ref} className="container my-4">
      {comments.length ? (
        <h3>Комментарии ({comments.length})</h3>
      ) : (
        <h3>Нет комментариев</h3>
      )}
      {token ? <AddComment /> : ''}
      {loading && <CommentsPlaceholder />}
      <CommentsList />
    </div>
  );
};

export default CommentsByQuestion;
