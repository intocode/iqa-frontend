import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QuestionViewsIcon from '../../../components/icons/QuestionViewsIcon';
import { questionSelectors } from '../questionsSlice';

const StyledViews = styled.div`
  width: 60px;

  span {
    font-size: 14px;
    color: #909399;
  }
`;

const QuestionViews = ({ questionId }) => {
  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  return (
    <StyledViews className="d-flex align-items-center justify-content-between">
      <QuestionViewsIcon />
      <span>{question.views}</span>
    </StyledViews>
  );
};

QuestionViews.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default QuestionViews;
