import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { theme } from '../../../../app/theme';
import { useAuth } from '../../../../common/context/Auth/useAuth';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import RestoreIcon from '../../../../components/icons/RestoreIcon';
import SpinnerIcon from '../../../../components/icons/SpinnerIcon';
import { selectProfile } from '../../../profile/profileSlice';
import {
  questionSelectors,
  removeQuestionById,
  restoreQuestionById,
  selectDeletingQuestions,
  selectRestoringQuestions,
} from '../../questionsSlice';
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
  const restoringQuestions = useSelector(selectRestoringQuestions);

  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  const handleToggleDelete = () => {
    if (question.deleted) {
      dispatch(restoreQuestionById(question._id));
    } else {
      dispatch(removeQuestionById(question._id));
    }
  };

  const isDeliting = useMemo(
    () => deletingQuestions.find((id) => id === question._id),
    [deletingQuestions, question]
  );

  const isRestoring = useMemo(
    () => restoringQuestions.find((id) => id === question._id),
    [restoringQuestions, question]
  );

  const deletingIcon = question.deleted ? <RestoreIcon /> : <DeleteIcon />;

  const isProcessing = isDeliting || isRestoring;

  if (!REACT_APP_FEATURE_DELETE_QUESTION || !token || !profile.isAdmin) return null;

  const DeletingIcon = (
    <StyledDelete className="delete">{isProcessing ? <SpinnerIcon /> : deletingIcon}</StyledDelete>
  );

  return (
    <TheQuestionAction
      icon={DeletingIcon}
      color={theme.colors.danger.main}
      onClick={handleToggleDelete}
    />
  );
};

DeleteAction.propTypes = {
  questionId: PropTypes.string.isRequired,
};
