import PropTypes from 'prop-types';
import FavoritesIcon from '../../../../components/icons/FavoritesIcon';
import FavoritesInIcon from '../../../../components/icons/FavoritesInIcon';

const FavoriteIconSwitcher = ({ usersList, myId }) => {
  if (usersList.includes(myId)) {
    return <FavoritesInIcon />;
  }

  return <FavoritesIcon />;
};

FavoriteIconSwitcher.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.string).isRequired,
  myId: PropTypes.string.isRequired,
};

export default FavoriteIconSwitcher;
