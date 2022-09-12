import { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Input, Alert } from 'antd';
import { Title } from '../../../app/Title/Title';
import { Paper, Typography } from '../../../components/ui';
import { selectProfile } from '../../profile/profileSlice';
import { addQuestion } from '../questionsSlice';
import { useAuth } from '../../../common/context/Auth/useAuth';

const StyledQuestionWrapper = styled.div`
  & .new-tag {
    display: flex;
    align-items: center;
    background: #f8f9fa;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    max-width: 85px;
    font-weight: 500;
    padding: 6px 8px;
    color: #606266;
    font-size: 12px;
    line-height: 14px;
    cursor: pointer;

    & svg {
      margin-right: 11px;
    }

    & span {
      white-space: nowrap;
      padding: 0;
    }

    & input {
      font-size: 12px;
      line-height: 14px;
      padding: 0;
      max-width: 45px;
      border: none;
      background-color: transparent;

      &:focus {
        outline: none;
      }
    }
  }
`;

const StyledAvatar = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 1.5rem;
    margin-right: 0.5rem;
  }
`;

const StyledInputBlock = styled.div`
  width: 77px;
  margin-top: 5px;
`;

const StyledTagBlock = styled.div`
  height: fit-content;
  margin-top: 5px;
`;

const CreateQuestion = () => {
  const dispatch = useDispatch();
  const editorRef = useRef();

  const profile = useSelector(selectProfile);

  const { token } = useAuth();

  const [question, setQuestion] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [tagValue, setTagValue] = useState('');

  const [tags, setTags] = useState([]);

  const [tagEditMode, setTagEditMode] = useState(false);
  const [tooManyQuestions, setTooManyQuestions] = useState(false);

  const addTag = () => {
    if (!tags.includes(tagValue)) {
      setTags([...tags, tagValue]);
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const callbackRef = useCallback((event) => {
    if (event) {
      event.focus();
    }
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTag(tagValue);

      setTagValue('');
      setTagEditMode(false);
    }
  };

  const handleCreate = () => {
    dispatch(
      addQuestion({
        question,
        fullDescription,
        tags,
        userId: profile._id,
      })
    );
    setQuestion('');
    setFullDescription('');
    editorRef.current.getInstance().reset();
  };

  const handleChange = () => {
    const instance = editorRef.current.getInstance();
    setFullDescription(instance.getMarkdown());
  };

  useEffect(() => {
    if (/\?[^?]+\?/.test(question)) {
      setTooManyQuestions(true);
    } else {
      setTooManyQuestions(false);
    }
  }, [question]);

  // если не авторизован, то кидаем на главную
  if (!token) return <Redirect to="/" />;

  const { REACT_APP_FEATURE_TAGS } = process.env;

  return (
    <>
      <Title>iqa: добавить вопрос</Title>
      <StyledQuestionWrapper className="container">
        <div className="container m-3 m-md-auto">
          <div className="d-flex justify-content-between my-3">
            <h3>Добавление вопроса</h3>
            <Link to="/">
              <Typography>Вернуться назад</Typography>
            </Link>
          </div>
        </div>

        <Paper>
          <div className="d-flex align-items-center">
            <StyledAvatar>
              <img src={profile.avatar?.thumbnail} alt="avatar" />
            </StyledAvatar>
            <p>{profile.name}</p>
          </div>

          {tooManyQuestions && (
            <Alert
              message="В одном посте рекомендуется публиковать только один вопрос."
              type="warning"
              className="mt-3"
            />
          )}

          <div className="mt-4 mb-3">
            Как звучит вопрос?<sup>*</sup>
          </div>

          <Input
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            placeholder="Формулировка вопроса..."
            autoFocus
          />

          <div>
            <div className="mt-4 mb-3">Дополнительный комментарий</div>
            <Editor
              theme="iqa"
              previewStyle="vertical"
              height="200px"
              initialEditType="wysiwyg"
              useCommandShortcut
              usageStatistics={false}
              hideModeSwitch
              value={fullDescription}
              onChange={handleChange}
              ref={editorRef}
              toolbarItems={[
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote', 'code', 'codeblock'],
              ]}
              autofocus={false}
            />

            {REACT_APP_FEATURE_TAGS && (
              <>
                <div className="mt-4 mb-3">
                  Теги<sup>*</sup>
                </div>

                <div className="d-flex flex-wrap">
                  {tags.map((tag) => (
                    <StyledTagBlock>
                      <Tag key={tag} closable onClose={() => removeTag(tag)}>
                        {tag}
                      </Tag>
                    </StyledTagBlock>
                  ))}

                  {!tagEditMode && (
                    <StyledTagBlock>
                      <Tag className="site-tag-plus" onClick={() => setTagEditMode(true)}>
                        <PlusOutlined /> New Tag
                      </Tag>
                    </StyledTagBlock>
                  )}

                  {tagEditMode && (
                    <StyledInputBlock>
                      <Input
                        ref={callbackRef}
                        type="text"
                        size="small"
                        value={tagValue}
                        onChange={(e) => setTagValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onBlur={() => setTagEditMode(false)}
                      />
                    </StyledInputBlock>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="mt-4">
            <div className="row align-items-center">
              <div className="col-auto">
                <Button
                  onClick={handleCreate}
                  color="primary"
                  disabled={REACT_APP_FEATURE_TAGS && !tags.length}
                >
                  Опубликовать
                </Button>
              </div>
              <div className="col-auto">
                <Link to="/" className="cancel">
                  <Typography color="gray">Отмена</Typography>
                </Link>
              </div>
            </div>
          </div>
        </Paper>
      </StyledQuestionWrapper>
    </>
  );
};

export default CreateQuestion;
