import styled from 'styled-components';
import { Paper } from '../components/Paper';
import { Rate } from '../components/Rate';
import { Tag } from '../components/Tag';

export default {
  title: 'Example/ListQuestion',
};

const StyledDecorator = styled.div`
  width: 800px;
  margin: auto;

  & > div {
    margin-bottom: 20px;
  }
`;

const StyledAvatr = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  margin-right: 10px;
  & > img {
    border-radius: 24px;
  }
`;

const StyledTag = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-right: 10px;
  }

  & > div:last-child {
    margin-right: 0;
  }
`;

export const PageQuestion = () => {
  const questions = [
    {
      name: 'kuduzow',
      text: 'Как проверить, что число является четным, при этом не используя деления по модулю или деления с остатком (оператора %)?',
      date: 'Добавлено неделю назад',
      avatar: 'http://cs622426.vk.me/v622426834/409d/baLqspYwi84.jpg',
      currentRate: 10,
      tag: [
        {
          name: 'React',
        },
        {
          name: 'Express',
        },
        {
          name: 'Node js',
        },
      ],
    },
    {
      name: 'alvi',
      text: 'Что такое деструктуризация объекта (Object Destructuring)?',
      date: 'Добавлено сегодня',
      avatar: 'http://cs622426.vk.me/v622426834/409d/baLqspYwi84.jpg',
      currentRate: 3,
      tag: [
        {
          name: 'Bootstrap',
        },
        {
          name: 'Express',
        },
        {
          name: 'Асинхронность',
        },
      ],
    },

    {
      name: 'vakha',
      text: 'В чем разница между spread-оператором и rest-оператором?',
      date: 'Добавлено вчера',
      avatar: 'http://cs622426.vk.me/v622426834/409d/baLqspYwi84.jpg',
      currentRate: 4,
      tag: [
        {
          name: 'JavaScript',
        },
        {
          name: 'Material UI',
        },
        {
          name: 'Redux Thunk',
        },
      ],
    },
  ];

  return (
    <StyledDecorator>
      {questions.map((question) => {
        return (
          <Paper>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledAvatr>
                  <img width="100%" src={question.avatar} alt="" />
                </StyledAvatr>
                <p>{question.name}</p>
                <div style={{ color: '#909399', fontSize: 12, marginLeft: 10 }}>
                  {question.date}
                </div>
              </div>
              <StyledTag>
                {question.tag.map((item) => {
                  return <Tag>{item.name}</Tag>;
                })}
              </StyledTag>
            </div>
            <h3>{question.text}</h3>
            <div>
              <Rate currentRate={question.currentRate} />
            </div>
          </Paper>
        );
      })}
    </StyledDecorator>
  );
};
