import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectProfile } from '../../../profile/profileSlice';
import { questionSelectors } from '../../questionsSlice';
import favoritesIcon from '../../../../assets/sprite.svg';

const FavoritesIconAnimation = styled.div`
  cursor: pointer;
  height: 49px;
  width: 49px;
  margin: -20px -15px;
  background-image: url(${favoritesIcon});
  background-position: right;
  background-size: 2900%;
  animation: star-burst 0.4s steps(27) 1;

  @keyframes star-burst {
    from {
      background-position: left;
    }
    to {
      background-position: right;
    }
  }
`;
const StyledFavoritesIcon = styled.div`
  cursor: pointer;
  height: 49px;
  width: 49px;
  margin: -20px -15px;
  background-image: url(${favoritesIcon});
  background-position: left;
  background-size: 2700%;
`;

const FavoriteIconSwitcher = ({ questionId }) => {
  const profile = useSelector(selectProfile);

  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  if (question.usersThatFavoriteIt.includes(profile._id)) {
    return <FavoritesIconAnimation />;
  }

  return <StyledFavoritesIcon />;
};

FavoriteIconSwitcher.propTypes = {
  questionId: PropTypes.PropTypes.string.isRequired,
};

export default FavoriteIconSwitcher;
