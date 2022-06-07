import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuestions,
  resetSuccess,
  selectQuestions,
  selectQuestionsLoading,
  resetQuestions,
  selectTotalQuestions,
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
import { Spinner } from '../../components/ui/Spinner';
import { QUESTION_INFINITY_SCROLLING_LIMIT } from '../../common/constants';

const QuestionsList = () => {
  const dispatch = useDispatch();

  const scrollBorder = 100; // граница, по мере придвижения к которой делается скролл

  const [currentOffset, setCurrentOffset] = useState(0);

  const questions = useSelector(selectQuestions);
  const questionsTotalAmount = useSelector(selectTotalQuestions);
  const loading = useSelector(selectQuestionsLoading);
  const isCompactMode = useSelector(selectIsCompactModeToogle);

  const scrollHandler = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          scrollBorder &&
        questionsTotalAmount > currentOffset + QUESTION_INFINITY_SCROLLING_LIMIT
      ) {
        if (!loading) {
          dispatch(
            fetchQuestions({
              limit: QUESTION_INFINITY_SCROLLING_LIMIT,
              offset: currentOffset + QUESTION_INFINITY_SCROLLING_LIMIT,
            })
          );
          setCurrentOffset(currentOffset + QUESTION_INFINITY_SCROLLING_LIMIT);
        }
      }
    },
    [dispatch, currentOffset, loading, questionsTotalAmount]
  );

  useEffect(() => {
    dispatch(resetQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !questions.length) {
      dispatch(
        fetchQuestions({
          limit: QUESTION_INFINITY_SCROLLING_LIMIT,
          offset: currentOffset,
        })
      );
    }
  }, [dispatch, loading, questions, currentOffset]);

  // очистка сообщения об успешном добавлении вопроса
  useEffect(() => {
    dispatch(resetSuccess());
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

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
        {loading && <Spinner />}
      </div>
    </>
  );
};

export default QuestionsList;
