import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CommentsIcon from '../../../../components/icons/CommentsIcon';
import { questionSelectors } from '../../questionsSlice';
import { TheQuestionAction } from './TheQuestionAction';
import { theme } from '../../../../app/theme';

export const CommentsAction = ({ questionId }) => {
  const { REACT_APP_FEATURE_COMMENTARIES } = process.env;

  const history = useHistory();

  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  const handleOpenComments = () => {
    history.push(`/question/${question._id}#scroll`);
  };

  if (!REACT_APP_FEATURE_COMMENTARIES) return null;

  return (
    <TheQuestionAction
      icon={<CommentsIcon />}
      onClick={handleOpenComments}
      color={theme.colors.primary.main}
    >
      {question.commentsCount > 0 ? question.commentsCount : 'Обсуждение'}
    </TheQuestionAction>
  );
};

CommentsAction.propTypes = {
  questionId: PropTypes.string.isRequired,
};
