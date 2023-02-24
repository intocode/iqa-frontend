import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'common/context/Auth/useAuth';
import { selectProfile } from 'features/profile/profileSlice';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DeleteIcon from 'components/icons/DeleteIcon';
import SpinnerIcon from 'components/icons/SpinnerIcon';
import { commentsSelectors, removeCommentById } from 'features/comments/commentsSlice';

const StyledDelete = styled.div`
  cursor: pointer;
  height: 15.4px;
  svg {
    width: 100%;
    height: 100%;
  }
  margin-right: 13px;
`;

export const DeleteAction = ({ commentId }) => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  const { REACT_APP_FEATURE_DELETE_COMMENT } = process.env;
  const [isClickOnDelete, setIsClickOnDelete] = useState(false);
  const profile = useSelector(selectProfile);
  const comment = useSelector((state) => commentsSelectors.selectById(state, commentId));

  const handleToggleDelete = () => {
    dispatch(removeCommentById({ questionId: comment.questionId, commentId }));
  };

  if (!REACT_APP_FEATURE_DELETE_COMMENT || !token || !profile.isAdmin) return null;

  return (
    <div aria-hidden onClick={handleToggleDelete}>
      <StyledDelete className="delete" onClick={() => setIsClickOnDelete(true)}>
        {isClickOnDelete ? <SpinnerIcon /> : <DeleteIcon />}
      </StyledDelete>
    </div>
  );
};

DeleteAction.propTypes = {
  commentId: PropTypes.string.isRequired,
};
