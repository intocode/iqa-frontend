import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDeletedQuestions,
  fetchDeletedQuestions,
  selectQuestionsLoading,
  resetDeletedQuestions,
} from './questionsSlice';
import {
  selectIsCompactModeToogle,
  toggleIsCompactMode,
} from '../application/applicationSlice';
import { QuestionsListPlaceholder } from './QuestionsListPlaceholder';
import { Paper } from '../../components/ui';
import { Title } from '../../app/Title/Title';
import { Switch } from '../../components/ui/Switch';
import { QuestionBlock } from './QuestionBlock';

const DeletedQuestionsCart = () => {
  const dispatch = useDispatch();

  const deletedQuestions = useSelector(selectDeletedQuestions);
  const loading = useSelector(selectQuestionsLoading);
  const isCompactMode = useSelector(selectIsCompactModeToogle);

  useEffect(() => {
    dispatch(resetDeletedQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (!deletedQuestions.length && !loading) {
      dispatch(fetchDeletedQuestions());
    }
  }, [dispatch, loading, deletedQuestions]);

  const QuestionWrapper = isCompactMode ? Paper : React.Fragment;

  return (
    <>
      <Title>iqa: корзина</Title>
      <div className="container">
        <div className="row justify-content-between align-items-center my-3">
          <div className="col">
            <h2>Корзина</h2>
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
          {deletedQuestions.map((question) => (
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

export default DeletedQuestionsCart;
