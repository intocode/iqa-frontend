import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Paper } from '../../components/ui/Paper';
import { Tag } from '../../components/ui/Tag';
import { Typography } from '../../components/ui/Typography';
import { Rate } from '../../components/ui/Rate';
import { fetchQuestions, selectQuestionById } from './questionsSlice';

const StyledQuestionBlock = styled.div`
  max-width: 820px;
  margin: auto;
  & > div {
    margin: 20px 0;
  }
`;

const StyledPaperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const StyledAvatr = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 24px;
  }
  & > div {
    color: #909399;
    font-size: 12px;
    margin-left: 10px;
  }
`;

const StyledQuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTag = styled.div`
  display: flex;
  & > div {
    margin-right: 10px;
  }
  & > div:last-child {
    margin-right: 0;
  }
`;

const StyledComment = styled.div`
  max-width: 700px;
  margin: 20px auto;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const QuestionPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const question = useSelector(selectQuestionById(id));
  const [isUpped, setIsUpped] = useState();
  const [isDowned, setIsDowned] = useState();
  const reducer = (previousValue, currentValue) =>
    previousValue + currentValue.volume;
  const rate = question?.rates.reduce(reducer, 0);

  useEffect(() => dispatch(fetchQuestions()), [dispatch]);
  // eslint-disable-next-line no-console
  console.log(question);

  const onUp = () => {
    setIsDowned(false)
    setIsUpped(!isUpped);
  };

  const onDown = () => {
    setIsUpped(false);
    setIsDowned(!isDowned)
  }

  return (
    <StyledQuestionBlock>
      <StyledQuestionHeader>
        <h3>Обсуждение вопроса</h3>
        <StyledLink href="/">
          <Typography>Вернуться назад</Typography>
        </StyledLink>
      </StyledQuestionHeader>
      <Paper>
        <StyledPaperHeader>
          <StyledAvatr>
            <img src="" alt="" />
            <p>{question?.user}</p>
            <div>время</div>
          </StyledAvatr>
          <StyledTag>
            {question?.tags.map((tag) => (
              <Tag key={tag.name} noGutters>
                {tag.name}
              </Tag>
            ))}
          </StyledTag>
        </StyledPaperHeader>
        <h3>{question?.question}</h3>
        <StyledComment>{question?.comment}</StyledComment>
        <Rate
          currentRate={rate}
          onUp={onUp}
          isUpped={isUpped}
          onDown={onDown}
          isDowned={isDowned}
        />
      </Paper>
    </StyledQuestionBlock>
  );
};

export default QuestionPage;
