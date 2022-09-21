import { useSelector } from 'react-redux';
import { questionSelectors } from 'features/questions/questionsSlice';
import { QuestionBlock } from './QuestionBlock';

const QuestionsListMapper = () => {
  const questionsIds = useSelector(questionSelectors.selectIds);

  return questionsIds.map((id) => <QuestionBlock key={id} questionId={id} />);
};

export default QuestionsListMapper;
