import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { theme } from 'app/theme';
import { useAuth } from 'common/context/Auth/useAuth';
import DeleteIcon from 'components/icons/DeleteIcon';
import { selectProfile } from 'features/profile/profileSlice';
import SpinnerIcon from 'components/icons/SpinnerIcon';
import {
  questionSelectors,
  removeQuestionById,
  selectDeletingQuestions,
} from 'features/questions/questionsSlice';
import { TheQuestionAction } from './TheQuestionAction';

const StyledDelete = styled.div`
  color: ${(props) => (props.deleted ? theme.colors.primary.main : props.theme.colors.danger.main)};
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
`;

export const DeleteAction = ({ questionId }) => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  const { REACT_APP_FEATURE_DELETE_QUESTION } = process.env;

  const profile = useSelector(selectProfile);
  const deletingQuestions = useSelector(selectDeletingQuestions);

  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  const handleDelete = () => {
    dispatch(removeQuestionById(question._id));
  };

  const isDeliting = useMemo(
    () => deletingQuestions.find((id) => id === question._id),
    [deletingQuestions, question]
  );

  if (!REACT_APP_FEATURE_DELETE_QUESTION || !token || !profile.isAdmin || question.deleted) {
    return null;
  }

  const DeletingIcon = (
    <StyledDelete className="delete">{isDeliting ? <SpinnerIcon /> : <DeleteIcon />}</StyledDelete>
  );

  return (
    <TheQuestionAction
      icon={DeletingIcon}
      color={theme.colors.danger.main}
      onClick={handleDelete}
    />
  );
};

DeleteAction.propTypes = {
  questionId: PropTypes.string.isRequired,
};
