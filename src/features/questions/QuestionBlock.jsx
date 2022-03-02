import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/ru';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { Paper, Divider } from '../../components/ui';
import { QuestionHeader } from './QuestionHeader';
import { QuestionContent } from './QuestionContent';
import { QuestionsActions } from './QuestionsActions';

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale('ru');

const StyledQuestionBlock = styled.div`
  &:hover .delete {
    opacity: 1;
  }
  img.avatar {
    border-radius: 50%;
  }
  opacity: ${(props) => (props.deleted ? 0.3 : 1)};
`;

export const QuestionBlock = ({ question, isCompactMode }) => {
  const QuestionWrapper = isCompactMode ? React.Fragment : Paper;

  return (
    <StyledQuestionBlock className="mb-4" deleted={question.deleted}>
      <QuestionWrapper>
        {!isCompactMode && (
          <QuestionHeader isCompactMode={isCompactMode} question={question} />
        )}
        <QuestionContent isCompactMode={isCompactMode} question={question} />
        <QuestionsActions isCompactMode={isCompactMode} question={question} />
        {isCompactMode && <Divider className="mt-3" />}
      </QuestionWrapper>
    </StyledQuestionBlock>
  );
};

QuestionBlock.propTypes = {
  isCompactMode: PropTypes.bool.isRequired,
  question: PropTypes.shape({
    commentsCount: PropTypes.number.isRequired,
    deleted: PropTypes.bool,
  }).isRequired,
};
