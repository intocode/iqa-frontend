import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/ru';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Tag } from '../../components/ui';
import QuestionRate from './QuestionRate';

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale('ru');

const StyledQuestionBlock = styled.div`
  max-width: 820px;
  margin: auto;
  & > div {
    margin: 20px 0;
  }
`;

const StyledQuestionHeader = styled.div`
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
    margin-left: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
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

const StyledPaperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const StyledQuestion = styled.div`
  margin-bottom: 40px;
`

export const QuestionBlock = ({ question }) => {
  return (
    <StyledQuestionBlock>
      <Paper>
        <StyledPaperHeader>
          <StyledQuestionHeader>
            <img src={question.user?.avatar?.thumbnail} alt="" />
            <p>{question.user.name}</p>
            <div>добавлено {dayjs(question.createdAt).fromNow()}</div>
          </StyledQuestionHeader>
          <StyledTag>
          {question.tags.map((tag) => (
              <Tag key={tag.name} >{tag.name}</Tag>
          ))}
          </StyledTag>
        </StyledPaperHeader>
        <StyledQuestion>
          <Typography variant="header">
            <StyledLink to={`/question/${question._id}`}>
              {question.question}
            </StyledLink>
          </Typography>
        </StyledQuestion>
        <QuestionRate id={question._id} />
      </Paper>
    </StyledQuestionBlock>
  );
};

QuestionBlock.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        thumbnail: PropTypes.string,
        full: PropTypes.string,
      }),
    }).isRequired,

    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,

    rates: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
