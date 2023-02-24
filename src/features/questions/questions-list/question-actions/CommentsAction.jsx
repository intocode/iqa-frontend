import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CommentsIcon from 'components/icons/CommentsIcon';
import { questionSelectors } from 'features/questions/questionsSlice';
import { theme } from 'app/theme';
import { TheQuestionAction } from './TheQuestionAction';

export const CommentsAction = ({ questionId }) => {
  const { REACT_APP_FEATURE_COMMENTARIES } = process.env;

  const navigate = useNavigate();

  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  const handleOpenComments = () => {
    navigate(`/question/${question._id}#scroll`);
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
