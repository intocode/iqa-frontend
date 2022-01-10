import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/ru';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Tag, Paper } from '../../components/ui';
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
    width: 36px;
    height: 36px;
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
  margin-bottom: 30px;
`;

const StyledQuestion = styled.div`
  margin-bottom: 40px;
`;

const StyledBorderBottom = styled.div`
  border-bottom: 1px solid #f5f5f5;
`;

const StyledQuestionBottomBlock = styled.div`
  width: 390px;
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > img {
      margin-right: 5px;
    }
  }
`;

// const StyledFavorites = styled.p`
//   color: #e6a23c;
//   font-weight: 400;
//   font-size: 12px;
// `;
//
// const StyledComments = styled.p`
//   color: #409eff;
//   font-weight: 400;
//   font-size: 12px;
// `;

export const QuestionBlock = ({ question, isCompactMode }) => {
  const QuestionWrapper = isCompactMode ? React.Fragment : Paper;

  return (
    <StyledQuestionBlock>
      <QuestionWrapper>
        {!isCompactMode && (
          <StyledPaperHeader>
            <StyledQuestionHeader>
              <img src={question.user?.avatar?.thumbnail} alt="" />
              <p>{question.user.name}</p>
              <div>добавлен {dayjs(question.createdAt).fromNow()}</div>
            </StyledQuestionHeader>
            <StyledTag className="d-none d-md-block">
              {question.tags.map((tag) => (
                <Tag noGutters key={tag.name}>
                  {tag.name}
                </Tag>
              ))}
            </StyledTag>
          </StyledPaperHeader>
        )}
        <StyledQuestion>
          <Typography variant={isCompactMode ? 'caption' : 'header'}>
            <StyledLink to={`/question/${question._id}`}>
              {question.question}
            </StyledLink>
          </Typography>
        </StyledQuestion>
        <StyledQuestionBottomBlock>
          <QuestionRate id={question._id} />
          {/* isCompactMode && (
          <>
            <div>
              <img src={comments} alt="" />
              <StyledComments>Обсуждение</StyledComments>
            </div>
            <div>
              <img src={favorites} alt="" />
              <StyledFavorites>Добавить в избранное</StyledFavorites>
            </div>
          </>
        ) */}
        </StyledQuestionBottomBlock>
        {isCompactMode && <StyledBorderBottom />}
      </QuestionWrapper>
    </StyledQuestionBlock>
  );
};

QuestionBlock.propTypes = {
  isCompactMode: PropTypes.bool.isRequired,
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
