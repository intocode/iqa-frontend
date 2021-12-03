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

export const QuestionBlock = ({ question }) => {
  return (
    <div className="mb-4">
      <Paper>
        <div className="row justify-content-between align-items-center">
          <div className="col">
            <StyledQuestionHeader>
              <img src={question.user.avatarURL} alt="" />
              <p>{question.user.name}</p>
              <div>добавлено {dayjs(question.createdAt).fromNow()}</div>
            </StyledQuestionHeader>
          </div>
          <div className="col-auto">
            <div className="row g-2">
              {question.tags.map((tag) => (
                <div key={tag.name} className="col">
                  <Tag noGutters>{tag.name}</Tag>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="py-4">
          <Typography variant="header">
            <StyledLink to={`/question/${question._id}`}>
              {question.question}
            </StyledLink>
          </Typography>
        </div>
        <QuestionRate id={question._id} />
      </Paper>
    </div>
  );
};

QuestionBlock.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarURL: PropTypes.string, // todo: после исправления на сервере добавить .isRequired
    }).isRequired,

    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,

    rates: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
