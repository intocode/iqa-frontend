import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Typography } from '../../../components/ui';
import { questionSelectors } from '../questionsSlice';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:visited {
    color: #000;
  }
`;
const StyledWrapper = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 25px;
  & img.avatar {
    width: 36px;
    border-radius: 50%;
  }
`;
const StyledContent = styled.div`
  padding-left: 9px;
  & div {
    padding-right: 9px;
  }
  & span {
    padding-right: 9px;
    color: #909399;
  }
`;
const StyledComment = styled.div`
  padding-top: 10px;
  line-height: 28px;
`;

export const QuestionsLastComment = ({ questionId }) => {
  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  const handleClickScroll = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  if (!question.lastComment) {
    return null;
  }

  return (
    <StyledLink to={`/question/${question._id}`}>
      <StyledWrapper onClick={handleClickScroll}>
        <div className="d-flex">
          <div>
            <img src={question.lastComment.author.avatar.thumbnail} alt="" className="avatar" />
          </div>
          <StyledContent>
            <div className="d-flex align-items-center">
              <div>{question.lastComment.author.name}</div>
              <span>•</span>
              <Typography variant="small" color="gray">
                добавлен {dayjs(question.lastComment.createdAt).fromNow()}
              </Typography>
            </div>
            <StyledComment>{question.lastComment.text}</StyledComment>
          </StyledContent>
        </div>
      </StyledWrapper>
    </StyledLink>
  );
};

QuestionsLastComment.propTypes = {
  questionId: PropTypes.string.isRequired,
};
