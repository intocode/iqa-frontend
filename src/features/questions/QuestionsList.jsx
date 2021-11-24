/* eslint-disable no-param-reassign */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, selectQuestions } from './questionsSlice';
import { QuestionBlock } from './QuestionBlock';

export const QuestionsList = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('iqa_accessToken');
  const verifyToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));

  const questions = useSelector(selectQuestions);

  let isUpped = false;
  let isDowned = false;

  useEffect(() => dispatch(fetchQuestions()), [dispatch]);

  return (
    <div className="container">
      {questions.map((question) => {
        const valueRate = question.rates.reduce((acc, item) => {
          if (item.volume === -1) acc -= 1;
          if (item.volume === 1) acc += 1;
          return acc;
        }, 0);

        isUpped = false;
        isDowned = false;

        question.rates.forEach((item) => {
          if (item.user === verifyToken.userId && item.volume === 1) {
            isUpped = true;
          }
          if (item.user === verifyToken.userId && item.volume === -1) {
            isDowned = true;
          }
        });
        return (
          <QuestionBlock
            key={question._id}
            question={{
              id: question._id,
              question: question.question,
              date: question.createdAt,
            }}
            name={question.user.name}
            tags={question.tags}
            user={question.user}
            rate={valueRate}
            userId={verifyToken.userId}
            isUpped={isUpped}
            isDowned={isDowned}
          />
        );
      })}
    </div>
  );
};
