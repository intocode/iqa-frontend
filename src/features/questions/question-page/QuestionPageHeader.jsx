import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { Title } from 'app/Title/Title';
import { selectOpenedQuestion } from 'features/questions/questionsSlice';

export const QuestionPageHeader = () => {
  const question = useSelector(selectOpenedQuestion);

  return (
    <>
      <Title>{`iqa: ${question?.question}`}</Title>

      <div className="container m-3 m-md-auto">
        <div className="d-flex justify-content-between my-3">
          <h3>Обсуждение вопроса</h3>
          <Link to="/" component={Typography.Link}>
            Вернуться назад
          </Link>
        </div>
      </div>
    </>
  );
};
