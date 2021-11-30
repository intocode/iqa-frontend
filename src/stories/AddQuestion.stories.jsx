import styled from 'styled-components';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Paper } from '../components/ui/Paper';
import { Tag } from '../components/ui/Tag';

export default {
  title: 'Example/PageAddQuestion',
};
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
  color: #c0c4cc;
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
export const Page = () => {
  return (
    <StyledDecorator>
      <Paper>
        <div>
          <div style={{ marginBottom: 8 }}>Как звучит вопрос?</div>
          <Input placeholder="Формулировка вопроса..." />
        </div>
        <div style={{ margin: '20px 0 20px 0' }}>
          <div style={{ marginBottom: 8 }}>Дополнительный комментарий</div>
          <StyledTextArea placeholder={placeholderForTextArea} />
          <div style={{ marginBottom: 8 }}>Теги</div>
          <StyledDivTag>
            <Tag onRemove={3}>Redux</Tag>
            <Tag onRemove={3}>JavaScript</Tag>
            {{}}
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
          <Button color="primary">Добавить</Button>
          <div style={{ color: '#909399', fontSize: 14 }}>Отмена</div>
        </div>
      </Paper>
    </StyledDecorator>
  );
};
