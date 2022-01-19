import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuestions,
  resetSuccess,
  selectQuestions,
  selectQuestionsLoading,
} from './questionsSlice';
import {
  selectIsCompactModeToogle,
  toggleIsCompactMode,
} from '../application/applicationSlice';
import { QuestionBlock } from './QuestionBlock';
import { QuestionsListPlaceholder } from './QuestionsListPlaceholder';
import { Title } from '../../app/Title/Title';
import { Paper } from '../../components/ui';
import { Switch } from '../../components/ui/Switch';

export const QuestionsList = () => {
  const dispatch = useDispatch();

  const questions = useSelector(selectQuestions);
  const loading = useSelector(selectQuestionsLoading);
  const isCompactMode = useSelector(selectIsCompactModeToogle);

  useEffect(() => {
    if (!questions.length) {
      dispatch(fetchQuestions());
    }
  }, [dispatch, questions]);

  // очистка сообщения об успешном добавлении вопроса
  useEffect(() => {
    dispatch(resetSuccess());
  }, [dispatch]);

  const QuestionWrapper = isCompactMode ? Paper : React.Fragment;

  return (
    <>
      <Title>iqa: все вопросы</Title>
      <div className="container">
        <div className="row justify-content-between align-items-center my-3">
          <div className="col">
            <h2>Все вопросы</h2>
          </div>
          <div className="col-auto">
            <Switch
              turnedOn={isCompactMode}
              onChange={() => dispatch(toggleIsCompactMode())}
              disabled={false}
            >
              Компактный вид
            </Switch>
          </div>
        </div>
        {loading && <QuestionsListPlaceholder />}
        <QuestionWrapper>
          {questions.map((question) => (
            <QuestionBlock
              key={question._id}
              isCompactMode={isCompactMode}
              question={question}
            />
          ))}
        </QuestionWrapper>
      </div>
    </>
  );
};
