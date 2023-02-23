import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Paper } from 'components/layout/Paper';
import { selectIsCompactModeToogle } from 'features/application/applicationSlice';
import { questionSelectors } from 'features/questions/questionsSlice';
import { CommentView } from 'features/comments/CommentView';
import { QuestionHeader } from './QuestionHeader';
import { QuestionContent } from './QuestionContent';
import { QuestionsActions } from './question-actions/QuestionsActions';

const StyledQuestionBlock = styled.div`
  opacity: ${(props) => (props.deleted ? 0.3 : 1)};
  transition: all 0.5s;
  & .d-flex {
    cursor: pointer;
  }
`;

export const QuestionBlock = ({ questionId }) => {
  const isCompactMode = useSelector(selectIsCompactModeToogle);
  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  const QuestionWrapper = isCompactMode ? React.Fragment : Paper;

  return (
    <StyledQuestionBlock data-testid="question-block" className="mb-4" deleted={question.deleted}>
      <QuestionWrapper>
        {isCompactMode || <QuestionHeader questionId={questionId} />}

        <QuestionContent questionId={questionId} />

        {!isCompactMode && question.lastComment && (
          <CommentView comment={question.lastComment} lastComment />
        )}
        <QuestionsActions questionId={questionId} />

        {isCompactMode && <Divider className="mt-3" />}
      </QuestionWrapper>
    </StyledQuestionBlock>
  );
};

QuestionBlock.propTypes = {
  questionId: PropTypes.string.isRequired,
};
