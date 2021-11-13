import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, selectQuestions } from './questionsSlice';
import { QuestionBlock } from './QuestionBlock';

export const QuestionsList = () => {
  const dispatch = useDispatch();

  const questions = useSelector(selectQuestions);

  useEffect(() => dispatch(fetchQuestions()), [dispatch]);

  return (
    <div className="container">
      {questions.map((question) => (
        <QuestionBlock
          key={question._id}
          question={{
            question: question.question,
            date: question.createdAt,
          }}
          name={question.user.name}
          tags={question.tags}
          user={question.user}
        />
      ))}
    </div>
  );
};
