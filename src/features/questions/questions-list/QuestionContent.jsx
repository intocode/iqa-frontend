import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Typography } from '../../../components/ui';
import { selectIsCompactModeToogle } from '../../application/applicationSlice';
import { questionSelectors } from '../questionsSlice';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:visited {
    color: #000;
  }
`;

export const QuestionContent = ({ questionId }) => {
  const isCompactMode = useSelector(selectIsCompactModeToogle);

  const question = useSelector((state) => questionSelectors.selectById(state, questionId));
  return (
    <div className="mb-4">
      <Typography variant={isCompactMode ? 'caption' : 'header'}>
        <StyledLink to={`/question/${question._id}`}>{question.question}</StyledLink>
      </Typography>
    </div>
  );
};

QuestionContent.propTypes = {
  questionId: PropTypes.string.isRequired,
};
