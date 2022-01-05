import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuestions,
  selectQuestions,
  selectQuestionsLoading,
} from './questionsSlice';
import { QuestionBlock } from './QuestionBlock';
import { QuestionsListPlaceholder } from './QuestionsListPlaceholder';
import { Title } from '../../app/Title/Title';
import { Switch } from '../../components/ui/Switch';

export const QuestionsList = () => {
  const dispatch = useDispatch();

  const questions = useSelector(selectQuestions);
  const loading = useSelector(selectQuestionsLoading);

  const [isCompactMode, setIsCompactMode] = useState(false);

  useEffect(() => dispatch(fetchQuestions()), [dispatch]);

  // todo: добавить прелоадер

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
              on={isCompactMode}
              onChange={() => setIsCompactMode(!isCompactMode)}
              disabled={false}
            >
              Компактный вид
            </Switch>
          </div>
        </div>
        {loading && <QuestionsListPlaceholder />}
        {questions.map((question) => (
          <QuestionBlock key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};
