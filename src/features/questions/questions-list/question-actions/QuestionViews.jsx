import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import QuestionViewsIcon from '../../../../components/icons/QuestionViewsIcon';
import { questionSelectors } from '../../questionsSlice';
import { TheQuestionAction } from './TheQuestionAction';
import { theme } from '../../../../app/theme';

const QuestionViews = ({ questionId }) => {
  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  return (
    <TheQuestionAction icon={<QuestionViewsIcon />} color={theme.colors.gray.main}>
      {question.views}
    </TheQuestionAction>
  );
};

QuestionViews.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default QuestionViews;
