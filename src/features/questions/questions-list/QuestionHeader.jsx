import dayjs from 'dayjs';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { Tag, Typography } from 'antd';
import { useSelector } from 'react-redux';
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

  const { Text } = Typography;

  return (
    <StyledHeader data-testid="not-for-compact">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex align-items-center">
            <img src={question.author?.avatar?.thumbnail} alt="" className="avatar" />
            <span className="mx-2">{question.author.name}</span>
            <Text type="secondary">добавлен {dayjs(question.createdAt).fromNow()}</Text>
          </div>
        </div>
        <StyledTag className="col-auto d-none d-md-block">
          {REACT_APP_FEATURE_TAGS && question.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </StyledTag>
      </div>
    </StyledHeader>
  );
};

QuestionHeader.propTypes = {
  questionId: PropTypes.string.isRequired,
};
