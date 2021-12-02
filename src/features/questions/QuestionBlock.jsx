import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/ru';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '../../components/ui/Paper';
import { Tag } from '../../components/ui/Tag';
import QuestionRate from './QuestionRate';

const StyledQuestionBlock = styled.div`
  margin-bottom: 20px;
`;

const StyledPaperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledAvatar = styled.div`
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

const StyledQuestionText = styled.h3`
  margin: 20px 0 15px 0;
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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const QuestionBlock = ({ question }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(calendar);
  dayjs.locale('ru');

  return (
    <StyledQuestionBlock>
      <Paper>
        <StyledPaperHeader>
          <StyledAvatar>
            <img src={question.user.avatarURL} alt="" />
            <p>{question.user.name}</p>
            <div>добавлено {dayjs(question.date).fromNow()}</div>
          </StyledAvatar>
          <StyledTag>
            {question.tags.map((tag) => (
              <Tag key={tag.name} noGutters>
                {tag.name}
              </Tag>
            ))}
          </StyledTag>
        </StyledPaperHeader>
        <StyledLink to={`/question/${question.id}`}>
          <StyledQuestionText>{question.question}</StyledQuestionText>
        </StyledLink>
        <QuestionRate id={question.id} />
      </Paper>
    </StyledQuestionBlock>
  );
};

QuestionBlock.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarURL: PropTypes.string.isRequired,
    }).isRequired,

    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,

    rates: PropTypes.arrayOf.isRequired,
  }).isRequired,
};
