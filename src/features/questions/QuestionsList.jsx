import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuestions,
  resetSuccess,
  selectQuestions,
  selectQuestionsLoading,
} from './questionsSlice';
import { QuestionBlock } from './QuestionBlock';
import { QuestionsListPlaceholder } from './QuestionsListPlaceholder';
import { Title } from '../../app/Title/Title';
import { Paper } from '../../components/ui';

export const QuestionsList = () => {
  const dispatch = useDispatch();

  const questions = useSelector(selectQuestions);
  const loading = useSelector(selectQuestionsLoading);

  useEffect(() => {
    if (!questions.length) {
      dispatch(fetchQuestions());
    }
  }, [dispatch, questions]);

  // очистка сообщения об успешном добавлении вопроса
  useEffect(() => {
    dispatch(resetSuccess());
  }, [dispatch]);

  // todo: добавить прелоадер

  const isCompactView = false;

  const QuestionWrapper = isCompactView ? Paper : React.Fragment;

  return (
    <>
      <Title>iqa: все вопросы</Title>
      <div className="container">
        <div className="row justify-content-between align-items-center my-3">
          <div className="col">
            <h2>Все вопросы</h2>
          </div>
        </div>
        {loading && <QuestionsListPlaceholder />}
        <QuestionWrapper>
          {questions.map((question) => (
            <QuestionBlock
              key={question._id}
              isCompactView={isCompactView}
              question={question}
            />
          ))}
        </QuestionWrapper>
      </div>
    </>
  );
};
