import { Viewer } from '@toast-ui/react-editor';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import React from 'react';
import dayjs from 'dayjs';

const StyledWrapper = styled.div`
  ${(props) =>
    props.lastComment === 'true'
      ? css`
          background-color: #f5f5f5;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 25px;
          & > div {
            margin-bottom: 0 !important;
          }
        `
      : null}
`;
const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 36px;
    height: 36px;
    border-radius: 24px;
    margin-right: 10px;
  }
`;

const StyledCommentText = styled.div`
  margin-top: 10px;

  .toastui-editor-contents {
    font-size: 16px;
    line-height: 1.3rem;

    & pre {
      margin-top: 1rem;
    }
  }
`;

const StyledTime = styled.span`
  padding-left: 1rem;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray.main};

  &::before {
    content: '•';
    padding-right: 1rem;
  }
`;

export const CommentView = ({ comment, lastComment }) => {
  return (
    <StyledWrapper lastComment={lastComment}>
      <div className="row align-items mb-4 g-1">
        <div className="col-auto">
          <StyledProfile>
            <img src={comment.author?.avatar?.thumbnail} alt="" />
          </StyledProfile>
        </div>
        <div className="col">
          <div className="d-flex align-items-center">
            <span>{comment.author?.name}</span>
            <StyledTime>{dayjs(comment.createdAt).fromNow()}</StyledTime>
          </div>
          <StyledCommentText>
            <Viewer initialValue={comment.text} />
          </StyledCommentText>
        </div>
      </div>
    </StyledWrapper>
  );
};

CommentView.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.shape({
      avatar: PropTypes.shape({
        full: PropTypes.string,
        thumbnail: PropTypes.string,
      }),
      avatarUrl: PropTypes.string,
      name: PropTypes.string,
      _id: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    questionId: PropTypes.string,
    text: PropTypes.string,
    updatedAt: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  lastComment: PropTypes.string,
};

CommentView.defaultProps = {
  lastComment: 'false',
};
