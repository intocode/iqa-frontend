import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, selectQuestions } from './questionsSlice';
import { QuestionBlock } from './QuestionBlock';
import { Typography } from '../../components/ui/Typography';

const StyledQuestionList = styled.div`
  & .top {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & h2 {
      font-weight: 500;
      font-size: 22px;
      line-height: 22px;
    }
    & div {
      font-size: 14px;
    }
  }
`;

export const QuestionsList = () => {
  const dispatch = useDispatch();

  const questions = useSelector(selectQuestions);

  useEffect(() => dispatch(fetchQuestions()), [dispatch]);

  return (
    <StyledQuestionList className="container">
      <div className="top">
        <h2>Все вопросы</h2>
        <Typography>Показать все вопросы</Typography>
      </div>
      {questions.map((question) => (
        <QuestionBlock
          key={question._id}
          question={{
            id: question._id,
            question: question.question,
            date: question.createdAt,
            name: question.user.name,
            tags: question.tags,
            user: question.user,
            rates: question.rates,
          }}
        />
      ))}
    </StyledQuestionList>
  );
};
