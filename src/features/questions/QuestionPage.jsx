import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/ru';
import { Paper } from '../../components/ui/Paper';
import { Tag } from '../../components/ui/Tag';
import { Typography } from '../../components/ui/Typography';
import { Rate } from '../../components/ui/Rate';
import { addRate, fetchQuestions, selectQuestionById } from './questionsSlice';
import { useAuth } from '../../common/context/Auth/useAuth';
import { selectProfile } from '../profile/profileSlice';
import commentsLogo from "../../assets/comments.svg"
import favorites from '../../assets/favorites.svg';
import favoritesIn from '../../assets/favoritesIn.svg';

const StyledQuestionBlock = styled.div`
  max-width: 820px;
  margin: auto;
  & > div {
    margin: 20px 0;
  }
`;

const StyledPaperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const StyledAvatr = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 24px;
  }
  & > div {
    color: #909399;
    font-size: 12px;
    margin-left: 10px;
  }
`;

const StyledQuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
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

const StyledComment = styled.div`
  max-width: 700px;
  margin: 30px auto;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const StyledCommentsBlock = styled.div`
  display: flex;
  align-items: center;     /*Центрирование по вертикали */
  
  & > span {
    font-size: small;
    color: #409EFF;
    margin-left: 7px;
  }
`

const StyledFavoritBlock = styled.div`
  display: flex;
  align-items: center;     /*Центрирование по вертикали */
  
  & > span {
    font-size: small;
    color: #E6A23C;
    margin-left: 7px;
  }
`

const StyledQuestionAttributes = styled.div`
  display: flex;
  
  & > div {
    margin-right: 40px;
  }
`

const QuestionPage = () => {
  dayjs.extend(relativeTime);
  dayjs.extend(calendar);
  dayjs.locale('ru');

  const { token } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const question = useSelector(selectQuestionById(id));
  const profile = useSelector(selectProfile);
  const image = commentsLogo

  const [img, setImg] = useState(false)
  const favoriteImg = img ? favoritesIn : favorites

  useEffect(() => dispatch(fetchQuestions()), [dispatch]);

  let isUpped = false;
  let isDowned = false;

  const valueRate = question?.rates.reduce((acc, item) => {
    return acc + item.volume;
  }, 0);

  if (token) {
    question?.rates.forEach((item) => {
      if (item.user === profile._id && item.volume === 1) {
        isUpped = true;
      }
      if (item.user === profile._id && item.volume === -1) {
        isDowned = true;
      }
    });
  }

  const handleChangeRate = (data) => {
    if (token) {
      dispatch(addRate(data));
    }
  };

  return (
    <StyledQuestionBlock>
      <StyledQuestionHeader>
        <h3>Обсуждение вопроса</h3>
        <StyledLink href="/">
          <Typography>Вернуться назад</Typography>
        </StyledLink>
      </StyledQuestionHeader>
      <Paper>
        <StyledPaperHeader>
          <StyledAvatr>
            <img src={question?.user.avatarURL} alt="" />
            <p>{question?.name}</p>
            <div>добавлено {dayjs(question?.createdAt).fromNow()}</div>
          </StyledAvatr>
          <StyledTag>
            {question?.tags.map((tag) => (
              <Tag key={tag.name} noGutters>
                {tag.name}
              </Tag>
            ))}
          </StyledTag>
        </StyledPaperHeader>
        <h3>{question?.question}</h3>
        <StyledComment>{question?.comment}</StyledComment>
        <StyledQuestionAttributes>
          {token ? (
            <Rate
              isUpped={isUpped}
              isDowned={isDowned}
              onUp={() => handleChangeRate({ volume: 1, id: question._id })}
              onDown={() => handleChangeRate({ volume: -1, id: question._id })}
              currentRate={valueRate}
            />
          ) : (
            <Rate currentRate={valueRate} />
          )}
          <StyledCommentsBlock>
            <img src={image} alt="" />
            <span>32</span>
          </StyledCommentsBlock>
          <StyledFavoritBlock onClick={()=>  setImg(!img)}>
            <img src={favoriteImg} alt="" />
            <span>{img ? 'В избранном' : 'Добавить в избранное'}</span>
          </StyledFavoritBlock>
        </StyledQuestionAttributes>
      </Paper>
    </StyledQuestionBlock>
  );
};

export default QuestionPage;