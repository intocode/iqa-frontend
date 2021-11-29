import PropTypes from 'prop-types';
import { QuestionBlock } from '../features/questions/QuestionBlock';

export default {
  title: 'Question/SingleList',
};

export const CardQuestion = ({ question }) => {
  const questions = {
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
  };

  return question ? (
    <QuestionBlock
      question={{
        id: question._id,
        question: question.question,
        date: question.createdAt,
      }}
      name={question.user.name}
      tags={question.tags}
      user={question.user}
      rates={question.rates}
    />
  ) : (
    <QuestionBlock
      question={{
        id: questions._id,
        question: questions.question,
        date: questions.createdAt,
      }}
      name={questions.user.name}
      tags={questions.tags}
      user={questions.user}
      rates={questions.rates}
    />
  );
};

CardQuestion.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,

    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarURL: PropTypes.string.isRequired,
    }).isRequired,

    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,

    rates: PropTypes.arrayOf.isRequired,
  }).isRequired,
};
