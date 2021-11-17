import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Paper } from '../../components/ui/Paper';
import { Tag } from '../../components/ui/Tag';
import { fetchProfile, selectProfile } from '../profile/profileSlice';
import { fetchTags, removeTag, selectTags } from '../tags/tagsSlice';
import { addQuestion } from './questionsSlice';

const placeholderForTextArea =
  'Расскажи как был задан вопрос, какой ответ ты дал, оказался ли он верным и т.д. Любые сведения, которые могут помочь другим соискателям..';

const StyledDecorator = styled.div`
  width: 800px;
  margin: auto;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 130px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  outline: 0;
  box-sizing: border-box;
`;
const StyledDivTag = styled.div`
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 24px;
  align-items: center;
  & > div {
    margin-right: 20px;
  }
`;
const CreateQuestion = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectProfile);
  const tags = useSelector(selectTags);

  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');

  const writeQuestion = () => {
    dispatch(
      addQuestion({
        question,
        comment,
        tags,
        userId: user._id,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <StyledDecorator>
      <Paper>
        <div>
          <div style={{ marginBottom: 8 }}>Как звучит вопрос?</div>
          <Input
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            placeholder="Формулировка вопроса..."
          />
        </div>
        <div style={{ margin: '20px 0 20px 0' }}>
          <div style={{ marginBottom: 8 }}>Дополнительный комментарий</div>
          <StyledTextArea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder={placeholderForTextArea}
          />
          <div style={{ marginBottom: 8 }}>Теги</div>
          <StyledDivTag>
            {tags.map((tag) => (
              <Tag key={tag._id} onRemove={() => dispatch(removeTag(tag._id))}>
                {tag.name}
              </Tag>
            ))}
          </StyledDivTag>
        </div>
        <div
          style={{
            width: 170,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button onClick={writeQuestion} color="primary">
            Добавить
          </Button>
          <div style={{ color: '#909399', fontSize: 14 }}>Отмена</div>
        </div>
      </Paper>
    </StyledDecorator>
  );
};

export default CreateQuestion;
