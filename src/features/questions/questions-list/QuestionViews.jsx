import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QuestionViewsIcon from '../../../components/icons/QuestionViewsIcon';
import { questionSelectors } from '../questionsSlice';

const QuestionViews = ({ questionId }) => {
  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  const StyledViews = styled.div`
    display: flex;
    width: 60px;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 14px;
    }

    .logoSvg {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  return (
    <StyledViews>
      <QuestionViewsIcon />
      <span>{question.views}</span>
    </StyledViews>
  );
};

QuestionViews.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default QuestionViews;
