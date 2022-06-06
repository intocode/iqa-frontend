import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuestions,
  resetSuccess,
  selectQuestions,
  selectQuestionsLoading,
  resetQuestions,
  selectQuestionsAmount,
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

const QuestionsList = () => {
  const dispatch = useDispatch();

  const [currentOffset, setCurrentOffset] = useState(0);
  const [fetching, setFetching] = useState(true);

  const questions = useSelector(selectQuestions);
  const questionsTotalAmount = useSelector(selectQuestionsAmount);
  const loading = useSelector(selectQuestionsLoading);
  const isCompactMode = useSelector(selectIsCompactModeToogle);

  useEffect(() => {
    dispatch(resetQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (fetching) {
      dispatch(fetchQuestions(currentOffset));
      setCurrentOffset(currentOffset + 5);
      setFetching(false);
    }
  }, [dispatch, currentOffset, fetching, questions]);

  // очистка сообщения об успешном добавлении вопроса
  useEffect(() => {
    dispatch(resetSuccess());
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      questionsTotalAmount > currentOffset
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    // eslint-disable-next-line func-names
    return function () {
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
