import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Title } from '../../../app/Title/Title';
import { Typography } from '../../../components/ui';
import { selectOpenedQuestion } from '../questionsSlice';

export const QuestionPageHeader = () => {
  const question = useSelector(selectOpenedQuestion);

  return (
    <>
      <Title>{`iqa: ${question?.question}`}</Title>

      <div className="container m-3 m-md-auto">
        <div className="d-flex justify-content-between my-3">
          <h3>Обсуждение вопроса</h3>
          <Link to="/">
            <Typography>Вернуться назад</Typography>
          </Link>
        </div>
      </div>
    </>
  );
};
