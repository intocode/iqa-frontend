import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { theme } from '../../../../app/theme';
import { useAuth } from '../../../../common/context/Auth/useAuth';
import RestoreIcon from '../../../../components/icons/RestoreIcon';
import SpinnerIcon from '../../../../components/icons/SpinnerIcon';
import { selectProfile } from '../../../profile/profileSlice';
import {
  questionSelectors,
  restoreQuestionById,
  selectRestoringQuestions,
} from '../../questionsSlice';
import { TheQuestionAction } from './TheQuestionAction';

const StyledDelete = styled.div`
  color: ${(props) => (props.deleted ? theme.colors.primary.main : props.theme.colors.danger.main)};
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
`;

export const RestoreAction = ({ questionId }) => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  const { REACT_APP_FEATURE_DELETE_QUESTION } = process.env;

  const profile = useSelector(selectProfile);
  const restoringQuestions = useSelector(selectRestoringQuestions);

  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  const handleRestore = () => {
    dispatch(restoreQuestionById(question._id));
  };

  const isRestoring = useMemo(
    () => restoringQuestions.find((id) => id === question._id),
    [restoringQuestions, question]
  );

  if (!REACT_APP_FEATURE_DELETE_QUESTION || !token || !profile.isAdmin || !question.deleted) {
    return null;
  }

  const DeletingIcon = (
    <StyledDelete className="delete">
      {isRestoring ? <SpinnerIcon /> : <RestoreIcon />}
    </StyledDelete>
  );

  return (
    <TheQuestionAction
      icon={DeletingIcon}
      color={theme.colors.danger.main}
      onClick={handleRestore}
    />
  );
};

RestoreAction.propTypes = {
  questionId: PropTypes.string.isRequired,
};
