import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSuccess } from '../questions/questionsSlice';
import {
  selectIsCompactModeToogle,
  toggleIsCompactMode,
} from '../application/applicationSlice';
import { QuestionsListPlaceholder } from '../questions/QuestionsListPlaceholder';
import { Title } from '../../app/Title/Title';
import { Paper } from '../../components/ui';
import { Switch } from '../../components/ui/Switch';
import {
  fetchQuestionFavorites,
  selectFavorites,
  selectProfileLoading,
} from './profileSlice';
import { QuestionBlock } from '../questions/QuestionBlock';

const FavoriteList = () => {
  const dispatch = useDispatch();

  const questions = useSelector(selectFavorites);
  const loading = useSelector(selectProfileLoading);
  const isCompactMode = useSelector(selectIsCompactModeToogle);

  useEffect(() => {
    dispatch(fetchQuestionFavorites());
  }, [dispatch]);

  // очистка сообщения об успешном добавлении вопроса
  useEffect(() => {
    dispatch(resetSuccess());
  }, [dispatch]);

  const QuestionWrapper = isCompactMode ? Paper : React.Fragment;

  return (
    <>
      <Title>iqa: избранные</Title>
      <div className="container">
        <div className="row justify-content-between align-items-center my-3">
          <div className="col">
            <h2>Избранные</h2>
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
          {questions.map((question) => {
            return (
              <QuestionBlock
                key={question._id}
                isCompactMode={isCompactMode}
                question={question}
              />
            );
          })}
        </QuestionWrapper>
      </div>
    </>
  );
};

export default FavoriteList;
