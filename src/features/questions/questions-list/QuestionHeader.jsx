import dayjs from 'dayjs';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Tag } from '../../../components/ui';
import { questionSelectors } from '../questionsSlice';

const StyledTag = styled.div`
  display: flex;
  & > div {
    margin-right: 10px;
  }
  & > div:last-child {
    margin-right: 0;
  }
`;

const StyledHeader = styled.div`
  & img.avatar {
    width: 36px;
    border-radius: 50%;
  }
`;

export const QuestionHeader = ({ questionId }) => {
  const question = useSelector((state) => questionSelectors.selectById(state, questionId));
  const { REACT_APP_FEATURE_TAGS } = process.env;

  return (
    <StyledHeader>
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex align-items-center">
            <img src={question.author?.avatar?.thumbnail} alt="" className="avatar" />
            <span className="mx-2">{question.author.name}</span>
            <Typography variant="small" color="gray">
              добавлен {dayjs(question.createdAt).fromNow()}
            </Typography>
          </div>
        </div>
        <StyledTag className="col-auto d-none d-md-block">
          {REACT_APP_FEATURE_TAGS &&
            question.tags.map((tag) => (
              <Tag noGutters key={tag}>
                {tag}
              </Tag>
            ))}
        </StyledTag>
      </div>
    </StyledHeader>
  );
};

QuestionHeader.propTypes = {
  questionId: PropTypes.string.isRequired,
};
