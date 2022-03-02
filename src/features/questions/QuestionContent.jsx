import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '../../components/ui';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:visited {
    color: #000;
  }
`;

export const QuestionContent = ({ question, isCompactMode }) => {
  return (
    <div className="mb-4">
      <Typography variant={isCompactMode ? 'caption' : 'header'}>
        <StyledLink to={`/question/${question._id}`}>
          {question.question}
        </StyledLink>
      </Typography>
    </div>
  );
};

QuestionContent.propTypes = {
  isCompactMode: PropTypes.bool.isRequired,
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};
