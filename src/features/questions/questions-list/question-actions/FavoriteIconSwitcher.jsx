import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectProfile } from '../../../profile/profileSlice';
import { questionSelectors } from '../../questionsSlice';
import logo from '../../../../components/assets/sprite.svg';

const FavoritesIconAnimation = styled.div`
  cursor: pointer;
  height: 50px;
  width: 50px;
  margin-right: -15px;
  background-image: url(${logo});
  background-position: right;
  background-repeat: no-repeat;
  background-size: 2900%;
  animation: heart-burst 0.8s steps(27) 1;

  @keyframes heart-burst {
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
  height: 50px;
  width: 50px;
  margin-right: -15px;
  background-image: url(${logo});
  background-position: left;
  background-repeat: no-repeat;
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
