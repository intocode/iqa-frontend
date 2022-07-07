import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useAuth } from '../../../../common/context/Auth/useAuth';
import { selectProfile } from '../../../profile/profileSlice';
import {
  addQuestionToFavorites,
  deleteQuestionFromFavorites,
  questionSelectors,
} from '../../questionsSlice';
import FavoriteIconSwitcher from './FavoriteIconSwitcher';

const StyledFavoritesCounter = styled.div`
  color: ${(props) => props.theme.colors.danger.main};
  font-weight: 400;
  font-size: 14px;
  padding-left: 5px;
`;

export const FavoriteAction = ({ questionId }) => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  const { REACT_APP_FEATURE_FAVORITES } = process.env;

  const profile = useSelector(selectProfile);

  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  const handleToggleFavorite = () => {
    if (token) {
      if (question.usersThatFavoriteIt.includes(profile._id)) {
        dispatch(
          deleteQuestionFromFavorites({
            questionId: question._id,
            userId: profile._id,
          })
        );
      } else {
        dispatch(
          addQuestionToFavorites({
            questionId: question._id,
            userId: profile._id,
          })
        );
      }
    } else {
      // todo сделать окно запроса авторизации
    }
  };

  if (!REACT_APP_FEATURE_FAVORITES) return null;

  return (
    <div className="col-auto">
      <div
        role="button"
        aria-hidden
        onClick={handleToggleFavorite}
        className="d-flex align-items-center"
      >
        <div>
          <FavoriteIconSwitcher questionId={questionId} />
        </div>
        <StyledFavoritesCounter>{question.usersThatFavoriteIt.length}</StyledFavoritesCounter>
      </div>
    </div>
  );
};

FavoriteAction.propTypes = {
  questionId: PropTypes.string.isRequired,
};
