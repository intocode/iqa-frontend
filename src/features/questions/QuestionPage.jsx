import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/ru';
import { Paper, Tag, Typography } from '../../components/ui';
import {
  fetchQuestionById,
  selectOpenedQuestion,
  selectQuestionsLoading,
} from './questionsSlice';
import { QuestionPagePlaceholder } from './QuestionPagePlaceholder';
import QuestionRate from './QuestionRate';

const StyledQuestionBlock = styled.div`
  max-width: 820px;
  & > div {
    margin: 20px 0;
  }
`;

const StyledPaperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const StyledAvatar = styled.div`
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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale('ru');

const QuestionPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const question = useSelector(selectOpenedQuestion);
  const loading = useSelector(selectQuestionsLoading);

  useEffect(() => dispatch(fetchQuestionById(id)), [dispatch, id]);

  return (
    <StyledQuestionBlock className="m-3 m-md-auto">
      <StyledQuestionHeader>
        <h3>Обсуждение вопроса</h3>
        <StyledLink to="/">
          <Typography>Вернуться назад</Typography>
        </StyledLink>
      </StyledQuestionHeader>
      {loading ? (
        <QuestionPagePlaceholder />
      ) : (
        <Paper>
          <StyledPaperHeader>
            <StyledAvatar>
              <img src={question?.user?.avatar?.thumbnail} alt="" />
              <p>{question?.name}</p>
              <div>добавлено {dayjs(question?.createdAt).fromNow()}</div>
            </StyledAvatar>
            <StyledTag>
              {question?.tags.map((tag) => (
                <Tag key={tag.name} noGutters className="d-none d-md-block">
                  {tag.name}
                </Tag>
              ))}
            </StyledTag>
          </StyledPaperHeader>
          <h3>{question?.question}</h3>
          <StyledComment>
            <Viewer initialValue={question?.comment} />
          </StyledComment>
          {question ? <QuestionRate id={id} /> : 'Загрузка...'}
        </Paper>
      )}
    </StyledQuestionBlock>
  );
};

export default QuestionPage;
