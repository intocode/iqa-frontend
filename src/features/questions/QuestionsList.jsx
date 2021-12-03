import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, selectQuestions } from './questionsSlice';
import { Typography } from '../../components/ui/Typography';
import { QuestionBlock } from './QuestionBlock';

export const QuestionsList = () => {
  const dispatch = useDispatch();

  const questions = useSelector(selectQuestions);

  useEffect(() => dispatch(fetchQuestions()), [dispatch]);

  // todo: добавить прелоадер

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center my-3">
        <div className="col">
          <h2>Все вопросы</h2>
        </div>
        <div className="col-auto">
          <Typography>Показать популярные</Typography>
        </div>
      </div>
      {questions.map((question) => (
        <QuestionBlock key={question._id} question={question} />
      ))}
    </div>
  );
};
