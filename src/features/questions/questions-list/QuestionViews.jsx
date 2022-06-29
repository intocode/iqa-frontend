import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QuestionViewsIcon from '../../../components/icons/QuestionViewsIcon';
import { questionSelectors } from '../questionsSlice';

const StyledViews = styled.div`
  span {
    font-size: 14px;
    color: #909399;
    padding-left: 4px;
  }
`;

const QuestionViews = ({ questionId }) => {
  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  return (
    <div className="col-auto">
      <StyledViews className="d-flex">
        <QuestionViewsIcon />
        <span>{question.views}</span>
      </StyledViews>
    </div>
  );
};

QuestionViews.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default QuestionViews;
