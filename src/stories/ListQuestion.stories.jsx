import { CardQuestion } from './Question.stories';

export default {
  title: 'Question/List',
};

export const PageQuestion = () => {
  const questions = [
    {
      user: {
        name: 'kuduzow',
        avatarURL: 'http://cs622426.vk.me/v622426834/409d/baLqspYwi84.jpg',
      },
      question: {
        question:
          'Как проверить, что число является четным, при этом не используя деления по модулю или деления с остатком (оператора %)?',
        date: 'Добавлено неделю назад',
      },
      currentRate: 10,
      tags: [
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
      user: {
        name: 'kuduzow',
        avatarURL: 'http://cs622426.vk.me/v622426834/409d/baLqspYwi84.jpg',
      },
      question: {
        question:
          'Как проверить, что число является четным, при этом не используя деления по модулю или деления с остатком (оператора %)?',
        date: 'Добавлено неделю назад',
      },
      currentRate: 10,
      tags: [
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
      user: {
        name: 'kuduzow',
        avatarURL: 'http://cs622426.vk.me/v622426834/409d/baLqspYwi84.jpg',
      },
      question: {
        question:
          'Как проверить, что число является четным, при этом не используя деления по модулю или деления с остатком (оператора %)?',
        date: 'Добавлено неделю назад',
      },
      currentRate: 10,
      tags: [
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
  ];

  return questions.map(() => {
    return <CardQuestion />;
  });
};
