import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FavoritesIcon from '../../../../components/icons/FavoritesIcon';
import FavoritesInIcon from '../../../../components/icons/FavoritesInIcon';
import { selectProfile } from '../../../profile/profileSlice';
import { questionSelectors } from '../../questionsSlice';

const FavoriteIconSwitcher = ({ questionId }) => {
  const profile = useSelector(selectProfile);

  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  if (question.usersThatFavoriteIt.includes(profile._id)) {
    return <FavoritesInIcon />;
  }

  return <FavoritesIcon />;
};

FavoriteIconSwitcher.propTypes = {
  questionId: PropTypes.PropTypes.string.isRequired,
};

export default FavoriteIconSwitcher;
