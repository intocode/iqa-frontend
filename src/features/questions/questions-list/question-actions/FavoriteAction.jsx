import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from 'antd';
import { theme } from 'app/theme';
import { useAuth } from 'common/context/Auth/useAuth';
import { selectProfile } from 'features/profile/profileSlice';
import {
  addQuestionToFavorites,
  deleteQuestionFromFavorites,
  questionSelectors,
} from 'features/questions/questionsSlice';
import FavoritePopoverContent from './FavoritePopoverContent';
import FavoriteIconSwitcher from './FavoriteIconSwitcher';
import { TheQuestionAction } from './TheQuestionAction';

export const FavoriteAction = ({ questionId }) => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  const { REACT_APP_FEATURE_FAVORITES } = process.env;

  const profile = useSelector(selectProfile);

  const question = useSelector((state) => questionSelectors.selectById(state, questionId));

  const FavoritePopover = token ? React.Fragment : Popover;

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
    <FavoritePopover placement="bottomLeft" trigger="click" content={FavoritePopoverContent}>
      <TheQuestionAction
        icon={<FavoriteIconSwitcher questionId={questionId} />}
        onClick={handleToggleFavorite}
        color={theme.colors.danger.main}
      >
        {question.usersThatFavoriteIt.length}
      </TheQuestionAction>
    </FavoritePopover>
  );
};

FavoriteAction.propTypes = {
  questionId: PropTypes.string.isRequired,
};
