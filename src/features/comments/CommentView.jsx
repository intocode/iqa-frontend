import { Viewer } from '@toast-ui/react-editor';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import React from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { CommentsActions } from './comment-actions/CommentsActions';
import likedIcon from '../../components/assets/liked.svg';
import unlikedIcon from '../../components/assets/unliked.svg';
import { selectProfile } from '../profile/profileSlice';
import { addLike, unLike } from './commentsSlice';

const StyledWrapper = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 25px;
  & > div {
    margin-bottom: 0 !important;
  }
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

const StyledCommentLikes = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  & > button {
    border: none;
    background: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }

  & > span {
    margin-left: 0.3125rem;
    color: #ff4646;
    font-weight: 400;
    font-size: 0.875rem;
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

const StyledCommentActions = styled.div`
  display: flex;
`;

export const CommentView = ({ comment, lastComment }) => {
  const { REACT_APP_FEATURE_LIKE_COMMENT } = process.env;
  const Wrapper = lastComment ? StyledWrapper : React.Fragment;
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const commentLikes = comment.likes || 0;
  const likedComment = comment._id;
  const likedByUser = profile._id;

  const handleToggleLike = () => {
    if (likedByUser === likedComment) {
      dispatch(addLike({ likedComment, likedByUser }));
    } else {
      dispatch(unLike({ likedComment, likedByUser }));
    }
  };

  return (
    <Wrapper>
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
          {REACT_APP_FEATURE_LIKE_COMMENT && (
            <StyledCommentLikes>
              <button
                className="d-flex align-items-center"
                type="button"
                onClick={handleToggleLike}
              >
                <img src={likedByUser === comment._id ? likedIcon : unlikedIcon} alt="Лайк" />
              </button>
              <span>{commentLikes.length}</span>
            </StyledCommentLikes>
          )}
          {!lastComment && (
            <StyledCommentActions>
              <CommentsActions commentId={comment._id} />
            </StyledCommentActions>
          )}
        </div>
      </div>
    </Wrapper>
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
    likes: PropTypes.arrayOf(PropTypes.string),
    updatedAt: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  lastComment: PropTypes.bool,
};

CommentView.defaultProps = {
  lastComment: false,
};
