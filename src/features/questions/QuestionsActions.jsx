import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import QuestionRate from './QuestionRate';
import CommentsIcon from '../../components/icons/CommentsIcon';
import SpinnerIcon from '../../components/icons/SpinnerIcon';
import { useAuth } from '../../common/context/Auth/useAuth';
import {
  addQuestionInFavorites,
  deleteQuestionFromFavorites,
  selectAddingToFavorites,
  selectDeletingFromFavorites,
  selectProfile,
} from '../profile/profileSlice';
import {
  removeQuestionById,
  restoreQuestionById,
  selectDeletingQuestions,
  selectRestoringQuestions,
  removeRestoredFromCart,
} from './questionsSlice';
import FavoritesInIcon from '../../components/icons/FavoritesInIcon';
import FavoritesIcon from '../../components/icons/FavoritesIcon';
import RestoreIcon from '../../components/icons/RestoreIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:visited {
    color: #000;
  }
`;

const StyledFavorites = styled.div`
  color: #e6a23c;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
`;

const StyledDelete = styled.div`
  color: ${(props) => (props.deleted ? '#3d8bfd' : '#dc3545')};
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
  opacity: 0;
`;

const StyledComments = styled.div`
  color: #409eff;
  font-weight: 400;
  font-size: 12px;
`;

export const QuestionsActions = ({ question }) => {
  const { token } = useAuth();
  const user = useSelector(selectProfile);
  const adding = useSelector(selectAddingToFavorites);
  const deleting = useSelector(selectDeletingFromFavorites);
  const deletingQuestions = useSelector(selectDeletingQuestions);
  const restoringQuestions = useSelector(selectRestoringQuestions);

  const dispatch = useDispatch();

  const url = window.location.pathname;

  const questionByFavorites = useMemo(() => {
    return user.favorites?.find((item) => item === question._id);
  }, [user.favorites, question]);

  const iconFavorites = questionByFavorites ? (
    <FavoritesInIcon />
  ) : (
    <FavoritesIcon />
  );

  const handleToggleFavorite = () => {
    if (questionByFavorites) {
      dispatch(deleteQuestionFromFavorites(question._id));
    } else {
      dispatch(addQuestionInFavorites(question._id));
    }
  };

  const addingToFavorites = useMemo(() => {
    return adding?.find((id) => id === question._id);
  }, [adding, question]);

  const addingStatus = addingToFavorites
    ? 'Добавление'
    : 'Добавить в избранные';

  const deletingFromFavorites = useMemo(() => {
    return deleting?.find((id) => id === question._id);
  }, [deleting, question]);

  const deletingStatus = deletingFromFavorites ? 'Удаление' : 'В избранном';

  const handleToggleDelete = () => {
    if (question.deleted) {
      dispatch(restoreQuestionById(question._id));
      if (url === '/cart') {
        dispatch(removeRestoredFromCart(question._id));
      }
    } else {
      dispatch(removeQuestionById(question._id));
    }
  };

  const deletingQuestion = useMemo(() => {
    return deletingQuestions.find((id) => id === question._id);
  }, [deletingQuestions, question]);

  const deletingQuestionStatus = deletingQuestion
    ? 'Удаление'
    : 'Удалить вопрос';

  const restoringQuestion = useMemo(() => {
    return restoringQuestions.find((id) => id === question._id);
  }, [restoringQuestions, question]);

  const restoringQuestionStatus = restoringQuestion
    ? 'Восстановление'
    : 'Восстановить вопрос';

  const deletingIcon = question.deleted ? <RestoreIcon /> : <DeleteIcon />;

  const deletingSpinner =
    deletingQuestion || restoringQuestion ? <SpinnerIcon /> : deletingIcon;

  return (
    <div className="row">
      <div className="col-auto">
        <QuestionRate id={question._id} rates={question.rates} />
      </div>
      <div className="col">
        <div className="row justify-content-end justify-content-md-start">
          <div className="col-auto">
            <StyledLink to={`/question/${question._id}#scroll`}>
              <div className="d-flex align-items-center">
                <CommentsIcon />
                <StyledComments className="d-none d-md-block">
                  {question.commentsCount > 0
                    ? question.commentsCount
                    : 'Обсуждение'}
                </StyledComments>
              </div>
            </StyledLink>
          </div>

          {token && (
            <div className="col-auto">
              <div
                role="button"
                aria-hidden
                onClick={handleToggleFavorite}
                className="d-flex"
              >
                {addingToFavorites || deletingFromFavorites ? (
                  <SpinnerIcon />
                ) : (
                  iconFavorites
                )}
                <StyledFavorites className="d-none d-md-block">
                  {questionByFavorites ? deletingStatus : addingStatus}
                </StyledFavorites>
              </div>
            </div>
          )}

          {user.isAdmin && (
            <div className="col-auto">
              <div
                aria-hidden
                onClick={handleToggleDelete}
                className="d-flex align-items-center"
              >
                <StyledDelete className="delete">
                  {deletingSpinner}
                </StyledDelete>
                <StyledDelete
                  className="delete d-none d-md-block ms-1"
                  deleted={question.deleted}
                >
                  {question.deleted
                    ? restoringQuestionStatus
                    : deletingQuestionStatus}
                </StyledDelete>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

QuestionsActions.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    rates: PropTypes.arrayOf(PropTypes.object).isRequired,
    commentsCount: PropTypes.number.isRequired,
    deleted: PropTypes.bool,
  }).isRequired,
};
