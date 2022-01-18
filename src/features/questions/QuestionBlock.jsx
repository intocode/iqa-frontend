import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/ru';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Tag, Paper } from '../../components/ui';
import QuestionRate from './QuestionRate';
import comments from '../../assets/comments.svg';
import favorites from '../../assets/favorites.svg';
import favoritesIn from '../../assets/favoritesIn.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import yesIcon from '../../assets/yesIcon.svg';
import noIcon from '../../assets/noIcon.svg';
import {
  deleteQuestionFromFavorites,
  addQuestionInFavorites,
  selectProfile,
  selectAddingToFavorites,
  selectDeletingFromFavorites,
} from '../profile/profileSlice';
import { useAuth } from '../../common/context/Auth/useAuth';
import { removeQuestionById } from './questionsSlice';

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale('ru');

const StyledQuestionBlock = styled.div`
  max-width: 820px;
  margin: auto;
  & > div {
    margin: 20px 0;
  }
  :hover.styleDelete {
    opacity: 1;
  }
`;

const StyledQuestionHeader = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 36px;
    height: 36px;
    margin-right: 10px;
    border-radius: 24px;
  }
  & > div {
    color: #909399;
    font-size: 12px;
    margin-left: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
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

const StyledPaperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const StyledQuestion = styled.div`
  margin-bottom: 40px;
`;

const StyledBorderBottom = styled.div`
  border-bottom: 1px solid #f5f5f5;
`;

const StyledQuestionBottomBlock = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledFavorites = styled.p`
  color: #e6a23c;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
`;

const StyledDelete = styled.p`
  color: #dc3545;
  font-weight: 400;
  font-size: 12px;
`;
const StyledComments = styled.p`
  color: #409eff;
  font-weight: 400;
  font-size: 12px;
`;

const StyledAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  & > img {
    margin-right: 5px;
  }
`;

const StyledActionDelete = styled.div`
  opacity: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  & > img {
    margin-right: 5px;
  }
`;

const StyledDeleteButton = styled.div`
  cursor: pointer;
  height: 0;
  & > img {
    width: 19px;
    height: 19px;
    margin: 0 5px;
  }
`;

const StyledDeleteGroup = styled.div`
  display: flex;
  margin-left: 20px;
`;

export const QuestionBlock = ({ question, isCompactMode }) => {
  const { token } = useAuth();
  const user = useSelector(selectProfile);
  const adding = useSelector(selectAddingToFavorites);
  const deleting = useSelector(selectDeletingFromFavorites);

  const [iconDelete, setIconDelete] = useState(false);

  const dispatch = useDispatch();

  const QuestionWrapper = isCompactMode ? React.Fragment : Paper;

  const questionByFavorites = useMemo(() => {
    return user.favorites?.find((item) => item === question._id);
  }, [user.favorites, question]);

  const iconFavorites = questionByFavorites ? favoritesIn : favorites;

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

  const handleNoDelete = () => {
    setIconDelete(false);
  };

  const handleYesDelete = (id) => {
    dispatch(removeQuestionById(id));
    setIconDelete(false);
  };

  const deletingStatus = deletingFromFavorites ? 'Удаление' : 'В избранном';

  return (
    <StyledQuestionBlock>
      <QuestionWrapper>
        {!isCompactMode && (
          <StyledPaperHeader>
            <StyledQuestionHeader>
              <img src={question.user?.avatar?.thumbnail} alt="" />
              <p>{question.user.name}</p>
              <div>добавлен {dayjs(question.createdAt).fromNow()}</div>
            </StyledQuestionHeader>
            <StyledTag className="d-none d-md-block">
              {question.tags.map((tag) => (
                <Tag noGutters key={tag.name}>
                  {tag.name}
                </Tag>
              ))}
            </StyledTag>
          </StyledPaperHeader>
        )}
        <StyledQuestion>
          <Typography variant={isCompactMode ? 'caption' : 'header'}>
            <StyledLink to={`/question/${question._id}`}>
              {question.question}
            </StyledLink>
          </Typography>
        </StyledQuestion>
        <StyledQuestionBottomBlock>
          <div className="flex-grow-1 flex-md-grow-0">
            <QuestionRate id={question._id} />
          </div>
          <StyledAction className="mx-4">
            <img src={comments} alt="" />
            <StyledComments className="d-none d-md-block">
              Обсуждение
            </StyledComments>
          </StyledAction>
          {token && (
            <StyledAction onClick={handleToggleFavorite}>
              <img src={iconFavorites} alt="" />
              <StyledFavorites className="d-none d-md-block">
                {questionByFavorites ? deletingStatus : addingStatus}
              </StyledFavorites>
            </StyledAction>
          )}
          {user.isAdmin && (
            <StyledDeleteGroup>
              {iconDelete ? (
                <>
                  <StyledDeleteButton onClick={handleNoDelete}>
                    <img src={noIcon} alt="" />
                  </StyledDeleteButton>
                  <StyledDeleteButton
                    onClick={() => handleYesDelete(question._id)}
                  >
                    <img src={yesIcon} alt="" />
                  </StyledDeleteButton>
                </>
              ) : (
                <StyledDeleteButton onClick={() => setIconDelete(true)}>
                  <StyledActionDelete className="styleDelete">
                    <img src={deleteIcon} alt="" />
                    <StyledDelete className="d-none d-md-block">
                      Удалить вопрос
                    </StyledDelete>
                  </StyledActionDelete>
                </StyledDeleteButton>
              )}
            </StyledDeleteGroup>
          )}
        </StyledQuestionBottomBlock>
        {isCompactMode && <StyledBorderBottom />}
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
  }).isRequired,
};
