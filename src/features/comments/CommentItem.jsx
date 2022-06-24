import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Viewer } from '@toast-ui/react-editor';
import { commentsSelectors } from './commentsSlice';

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

export const CommentItem = ({ commentId }) => {
  const comment = useSelector((state) => commentsSelectors.selectById(state, commentId));
  return (
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
  );
};

CommentItem.propTypes = {
  commentId: PropTypes.string.isRequired,
};
