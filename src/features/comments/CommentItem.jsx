import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { commentsSelectors } from './commentsSlice';
import { CommentView } from './CommentView';

const StyledCommentBlock = styled.div`
  &:hover .delete {
    opacity: 1;
  }
`;

export const CommentItem = ({ commentId }) => {
  const comment = useSelector((state) => commentsSelectors.selectById(state, commentId));
  return (
    <StyledCommentBlock>
      <CommentView comment={comment} />
    </StyledCommentBlock>
  );
};

CommentItem.propTypes = {
  commentId: PropTypes.string.isRequired,
};
