import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { commentsSelectors } from './commentsSlice';
import { CommentView } from './CommentView';

export const CommentItem = ({ commentId }) => {
  const comment = useSelector((state) => commentsSelectors.selectById(state, commentId));
  return <CommentView comment={comment} />;
};

CommentItem.propTypes = {
  commentId: PropTypes.string.isRequired,
};
