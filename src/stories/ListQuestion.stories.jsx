import { QuestionBlock } from '../features/questions/QuestionBlock';

export default {
  title: 'Question/List',
};

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

  return questions.map((question) => {
    return (
      <QuestionBlock
        question={question.text}
        text={question.text}
        date={question.date}
        name={question.name}
        avatar={question.avatar}
        currentRate={question.currentRate}
        tag={question.tag}
      />
    );
  });
};
