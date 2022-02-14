import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/ru';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Tag, Paper, Divider } from '../../components/ui';
import QuestionRate from './QuestionRate';
import CommentsIcon from '../../components/icons/CommentsIcon';
import FavoritesIcon from '../../components/icons/FavoritesIcon';
import FavoritesInIcon from '../../components/icons/FavoritesInIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import {
  deleteQuestionFromFavorites,
  addQuestionInFavorites,
  selectProfile,
  selectAddingToFavorites,
  selectDeletingFromFavorites,
} from '../profile/profileSlice';
import { useAuth } from '../../common/context/Auth/useAuth';
import {
  removeQuestionById,
  restoreQuestionById,
  selectQuestionDeleting,
  selectQuestionRestoring,
} from './questionsSlice';
import SpinnerIcon from '../../components/icons/SpinnerIcon';
import RestoreIcon from '../../components/icons/RestoreIcon';

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale('ru');

const StyledQuestionBlock = styled.div`
  &:hover .styleDelete {
    opacity: 1;
  }

  img.avatar {
    border-radius: 50%;
  }
  opacity: ${(props) => (props.deleted ? 0.3 : 1)};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:visited {
    color: #000;
  }
`;

const StyledTag = styled.div`
  display: flex;
  & > div {
    margin-right: 10px;
  }
  & > div:last-child {
    margin-right: 0;
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
`;
const StyledComments = styled.div`
  color: #409eff;
  font-weight: 400;
  font-size: 12px;
`;

export const QuestionBlock = ({ question, isCompactMode }) => {
  const { token } = useAuth();
  const user = useSelector(selectProfile);
  const adding = useSelector(selectAddingToFavorites);
  const deleting = useSelector(selectDeletingFromFavorites);
  const questionDeleting = useSelector(selectQuestionDeleting);
  const questionRestoring = useSelector(selectQuestionRestoring);

  const dispatch = useDispatch();

  const QuestionWrapper = isCompactMode ? React.Fragment : Paper;

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
    } else {
      dispatch(removeQuestionById(question._id));
    }
  };

  const iconDeleting = question.deleted ? <RestoreIcon /> : <DeleteIcon />;
  const changeDeletingSpinner = questionDeleting ? (
    <SpinnerIcon deleting />
  ) : (
    <SpinnerIcon restoring />
  );

  return (
    <StyledQuestionBlock className="mb-4" deleted={question.deleted}>
      <QuestionWrapper>
        {!isCompactMode && (
          <div className="row mb-4">
            <div className="col">
              <div className="d-flex align-items-center">
                <img
                  src={question.user?.avatar?.thumbnail}
                  alt=""
                  className="avatar"
                />
                <span className="mx-2">{question.user.name}</span>
                <Typography variant="small" color="gray">
                  добавлен {dayjs(question.createdAt).fromNow()}
                </Typography>
              </div>
            </div>
            <StyledTag className="col-auto d-none d-md-block">
              {question.tags.map((tag) => (
                <Tag noGutters key={tag.name}>
                  {tag.name}
                </Tag>
              ))}
            </StyledTag>
          </div>
        )}
        <div className="mb-4">
          <Typography variant={isCompactMode ? 'caption' : 'header'}>
            <StyledLink to={`/question/${question._id}`}>
              {question.question}
            </StyledLink>
          </Typography>
        </div>
        <div className="row">
          <div className="col-auto">
            <QuestionRate id={question._id} rates={question.rates} />
          </div>
          <div className="col">
            <div className="row justify-content-end justify-content-md-start">
              <div className="col-auto">
                <div className="d-flex align-items-center">
                  <CommentsIcon />
                  <StyledComments className="d-none d-md-block">
                    {question.commentsCount > 0
                      ? question.commentsCount
                      : 'Обсуждение'}
                  </StyledComments>
                </div>
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
                    {questionDeleting || questionRestoring
                      ? changeDeletingSpinner
                      : iconDeleting}
                    <StyledDelete
                      className="d-none d-md-block ms-1"
                      deleted={question.deleted}
                    >
                      {question.deleted
                        ? 'Восстановить вопрос'
                        : 'Удалить вопрос'}
                    </StyledDelete>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isCompactMode && <Divider className="mt-3" />}
      </QuestionWrapper>
    </StyledQuestionBlock>
  );
};

QuestionBlock.propTypes = {
  isCompactMode: PropTypes.bool.isRequired,
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        thumbnail: PropTypes.string,
        full: PropTypes.string,
      }),
    }).isRequired,

    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,

    rates: PropTypes.arrayOf(PropTypes.object).isRequired,
    commentsCount: PropTypes.number.isRequired,

    deleted: PropTypes.bool,
  }).isRequired,
};
