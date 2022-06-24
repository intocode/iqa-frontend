import React, { lazy, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { commentsSelectors, fetchComments, selectCommentsLoading } from './commentsSlice';
import CommentsList from './CommentsList';
import { CommentsPlaceholder } from './CommentsPlaceholder';
import { useAuth } from '../../common/context/Auth/useAuth';

const AddComment = lazy(() => import('./AddComment'));

const CommentsOfQuestion = () => {
  const dispatch = useDispatch();

  const { token } = useAuth();
  const { id } = useParams();

  const commentIds = useSelector(commentsSelectors.selectIds);
  const fetching = useSelector(selectCommentsLoading);

  const ref = useRef(null);

  // todo refactor
  const { hash } = window.location;
  if (hash !== '') {
    if (ref.current) ref.current.scrollIntoView();
  }

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  return (
    <div ref={ref} className="container my-4">
      <h3 className="my-4">
        {commentIds.length ? `Комментарии (${commentIds.length})` : 'Нет комментариев'}
      </h3>

      {token && <AddComment />}

      {fetching ? <CommentsPlaceholder /> : <CommentsList />}
    </div>
  );
};

export default CommentsOfQuestion;
