import React from 'react';
import styled from 'styled-components';
import { Paper } from '../../components/ui/Paper';
import { Tag } from '../../components/ui/Tag';
import { Typography } from '../../components/ui/Typography';
import { Rate } from '../../components/ui/Rate';

const StyledQuestionBlock = styled.div`
  max-width: 820px;
  margin: auto;
  & > div {
    margin: 20px 0 
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
`

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

const QuestionPage = () => {
  const tags = [{ name: 'Node.js' }, { name: 'Express' }];
  return (
    <StyledQuestionBlock>
      <StyledQuestionHeader>
        <h3>Обсуждение вопроса</h3>
        <Typography>Вернуться назад</Typography>
      </StyledQuestionHeader>
      <Paper>
        <StyledPaperHeader>
          <StyledAvatr>
            <img src="" alt="" />
            <p>Имя</p>
            <div>время</div>
          </StyledAvatr>
          <StyledTag>
            {tags.map((tag) => (
              <Tag key={tag.name} noGutters>
                {tag.name}
              </Tag>
            ))}
          </StyledTag>
        </StyledPaperHeader>
        <h3>Какой-то вопрос</h3>
        <StyledComment>
          Мне задали этот вопрос когда я был маленьким и я не знал что ответить
          и заплакал. После этого я написал следующий рассказ: Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </StyledComment>
        <Rate>1</Rate>
      </Paper>
    </StyledQuestionBlock>
  );
};

export default QuestionPage;
