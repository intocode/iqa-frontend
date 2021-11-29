import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/ru';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Paper } from '../../components/ui/Paper';
import { Tag } from '../../components/ui/Tag';

const StyledQuestionBlock = styled.div`
  & > div {
    margin-bottom: 20px;
  }
`;

const StyledPaperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const StyledAvatr = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 24px;
  }
  & > div {
    color: #909399;
    font-size: 12px;
    line-height: 14px;
    margin-left: 10px;
  }
`;

const StyledTag = styled.div`
  display: flex;
  & > div {
    margin-right: 10px;
  }
  & > div:last-child {
    margin-right: 0;
  }
`;

export const QuestionBlock = ({ question, user, tags }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(calendar);
  dayjs.locale('ru');

  return (
    <StyledQuestionBlock>
      <Paper>
        <StyledPaperHeader>
          <StyledAvatr>
            <img src={user.avatarURL} alt="" />
            <p>{user.name}</p>
            <div>добавлено {dayjs(question.date).fromNow()}</div>
          </StyledAvatr>
          <StyledTag>
            {tags.map((tag) => (
              <Tag key={tag.name} noGutters>
                {tag.name}
              </Tag>
            ))}
          </StyledTag>
        </StyledPaperHeader>
        <h3>{question.question}</h3>
      </Paper>
    </StyledQuestionBlock>
  );
};

QuestionBlock.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,

  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
  }).isRequired,

  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,

  // FIXME: фича еще не внесена в проект
  // rate: PropTypes.number.isRequired,
};
