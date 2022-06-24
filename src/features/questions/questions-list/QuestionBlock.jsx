import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Divider } from '../../../components/ui';
import { QuestionHeader } from './QuestionHeader';
import { QuestionContent } from './QuestionContent';
import { QuestionsActions } from './question-actions/QuestionsActions';
import { selectIsCompactModeToogle } from '../../application/applicationSlice';
import { questionSelectors } from '../questionsSlice';

const StyledQuestionBlock = styled.div`
  opacity: ${(props) => (props.deleted ? 0.3 : 1)};
  transition: all 0.5s;

  &:hover .delete {
    opacity: 1;
  }
`;

export const QuestionBlock = ({ questionId }) => {
  const isCompactMode = useSelector(selectIsCompactModeToogle);
  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  const QuestionWrapper = isCompactMode ? React.Fragment : Paper;

  return (
    <StyledQuestionBlock className="mb-4" deleted={question.deleted}>
      <QuestionWrapper>
        {isCompactMode || <QuestionHeader questionId={questionId} />}

        <QuestionContent questionId={questionId} />
        <QuestionsActions questionId={questionId} />

        {isCompactMode && <Divider className="mt-3" />}
      </QuestionWrapper>
    </StyledQuestionBlock>
  );
};

QuestionBlock.propTypes = {
  questionId: PropTypes.string.isRequired,
};
