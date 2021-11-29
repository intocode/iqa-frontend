import { CardQuestion } from './Question.stories';

export default {
  title: 'Question/List',
};

export const PageQuestion = () => {
  const questions = [
    {
      _id: '618917179638397e33c5b17f',
      question:
        'Является ли использование унарного плюса (оператор "+") самым быстрым способом преобразования строки в число?',
      comment: 'Коммент 2',
      tags: [
        {
          name: 'Node',
          color: 'primary',
        },
        {
          name: 'Html',
          color: 'primary',
        },
        {
          name: 'Js',
          color: 'primary',
        },
        {
          name: 'Prettier',
          color: 'primary',
        },
      ],
      user: {
        _id: '6185767c1a72d5aa6123e885',
        name: 'irzakhanov',
        avatarURL: 'https://avatars.githubusercontent.com/u/47324041?v=4',
      },
      createdAt: '2021-11-08T12:24:55.073Z',
      updatedAt: '2021-11-26T20:56:39.826Z',
      __v: 124,
      rates: [
        {
          user: '6178023e610c07397dd703ff',
          volume: 1,
          _id: '619130f97b08ad45f490b280',
          createdAt: '2021-11-14T15:53:29.030Z',
          updatedAt: '2021-11-14T15:53:33.421Z',
        },
      ],
    },
    {
      _id: '6189171b9638397e33c5b181',
      question:
        'В чем разница между методами event.preventDefault() и event.stopPropagation()?',
      comment: 'Коммент 3',
      tags: [
        {
          name: 'Html',
          color: 'primary',
        },
        {
          name: 'JavaScript',
          color: 'primary',
        },
      ],
      user: {
        _id: '6185767c1a72d5aa6123e885',
        name: 'irzakhanov',
        avatarURL: 'https://avatars.githubusercontent.com/u/47324041?v=4',
      },
      createdAt: '2021-11-08T12:24:59.557Z',
      updatedAt: '2021-11-26T20:42:37.447Z',
      __v: 27,
      rates: [
        {
          user: '61940334a909374141960822',
          volume: 1,
          _id: '619f8133b5e1f85b2b16952e',
          createdAt: '2021-11-25T12:27:31.337Z',
          updatedAt: '2021-11-26T20:42:37.446Z',
        },
      ],
    },
    {
      _id: '61a15f0cc6d72467791a37cd',
      question: 'Чем const отличается от let?',
      comment: 'Я сказал что для написания этих слов используются разные буквы',
      tags: [
        {
          name: 'JavaScript',
          color: 'primary',
        },
      ],
      user: {
        _id: '61940334a909374141960822',
        name: 'danilbekk',
        avatarURL: 'https://avatars.githubusercontent.com/u/81219673?v=4',
      },
      rates: [],
      createdAt: '2021-11-26T22:26:20.037Z',
      updatedAt: '2021-11-26T22:26:20.037Z',
      __v: 0,
    },
  ];

  return questions.map((question) => {
    return <CardQuestion question={question} />;
  });
};
