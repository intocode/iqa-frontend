import { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Title } from '../../app/Title/Title';
import {
  Alert,
  Button,
  Input,
  Paper,
  Tag,
  Typography,
} from '../../components/ui';
import { selectProfile } from '../profile/profileSlice';
import {
  addTag,
  removeTag,
  resetTagStatus,
  selectTags,
  selectTagsError,
} from '../tags/tagsSlice';
import {
  addQuestion,
  resetStatus,
  selectQuestionsSuccess,
  selectQuestionsError,
  selectQuestionsLoading,
  resetSuccess,
} from './questionsSlice';

// const placeholderForTextArea =
//   'Расскажи как был задан вопрос, какой ответ ты дал, оказался ли он верным и т.д. Любые сведения, которые могут помочь другим соискателям..';

const StyledQuestionWrapper = styled.div`
  & .question-title,
  .comment-title,
  .tag-title {
    margin: 30px 0 10px;
  }

  & .additional {
    margin: 30px 0;
  }

  & .buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & button {
      margin-right: 27px;
    }
  }

  & .cancel {
    text-decoration: none;
  }

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

const StyledTagWrapper = styled.div`
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const StyledTitle = styled.div`
  margin: 20px 0;
`;

const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 36px;
    height: 36px;
    border-radius: 24px;
    margin-right: 10px;
  }
`;

const PlusIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 2V10" stroke="#606266" strokeLinejoin="round" />
    <path d="M2 6H10" stroke="#606266" strokeLinejoin="round" />
  </svg>
);

const CreateQuestion = () => {
  const dispatch = useDispatch();
  const editorRef = useRef();

  const profile = useSelector(selectProfile);
  const tags = useSelector(selectTags);
  const tagsError = useSelector(selectTagsError);
  const questionsError = useSelector(selectQuestionsError);
  const questionsSuccess = useSelector(selectQuestionsSuccess);
  const questionsLoading = useSelector(selectQuestionsLoading);

  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [manyQuestions, setManyQuestions] = useState(false);

  useEffect(() => {
    if (/\?[^?]+\?/.test(question)) {
      setManyQuestions(true);
    } else {
      setManyQuestions(false);
    }
  }, [question]);

  const callbackRef = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (!tags.some((tag) => tag.name === tagValue)) {
        dispatch(addTag({ name: tagValue }));
      }
      setTagValue('');
      setEditMode(false);
    }
  };

  const handleCreate = () => {
    dispatch(
      addQuestion({
        question,
        comment,
        tags,
        userId: profile._id,
      })
    );
    setQuestion('');
    setComment('');
    editorRef.current.getInstance().reset();
  };

  const handleChange = () => {
    const instance = editorRef.current.getInstance();
    setComment(instance.getMarkdown());
  };

  return (
    <>
      <Title>iqa: добавить вопрос</Title>
      <StyledQuestionWrapper className="container">
        {questionsError && (
          <Alert onClose={() => dispatch(resetStatus())} color="danger">
            {questionsError}
          </Alert>
        )}
        {tagsError && (
          <Alert onClose={() => dispatch(resetTagStatus())} color="danger">
            {tagsError}
          </Alert>
        )}
        {questionsSuccess && (
          <Alert onClose={() => dispatch(resetSuccess())}>
            Вопрос добавлен!
          </Alert>
        )}
        <StyledTitle>
          <h3>Добавление вопроса</h3>
        </StyledTitle>
        <Paper>
          <StyledProfile>
            <img src={profile.avatar?.thumbnail} alt="" />
            <p>{profile.name}</p>
          </StyledProfile>
          {manyQuestions && (
            <Alert color="warning">
              В одном посте рекомендуется публиковать только один вопрос.
            </Alert>
          )}
          <div className="question-title">
            Как звучит вопрос?<sup>*</sup>
          </div>
          <Input
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            placeholder="Формулировка вопроса..."
          />
          <div className="additional">
            <div className="comment-title">Дополнительный комментарий</div>
            <Editor
              previewStyle="vertical"
              height="200px"
              initialEditType="wysiwyg"
              useCommandShortcut
              usageStatistics={false}
              hideModeSwitch
              value={comment}
              onChange={handleChange}
              ref={editorRef}
              toolbarItems={[
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote', 'code', 'codeblock'],
              ]}
            />
            <div className="tag-title">
              Теги<sup>*</sup>
            </div>
            <StyledTagWrapper>
              {tags.map((tag) => (
                <Tag
                  key={tag._id}
                  onRemove={() => dispatch(removeTag(tag._id))}
                >
                  {tag.name}
                </Tag>
              ))}
              {/* todo убрать дублирование ниже */}
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  type="button"
                  className="new-tag"
                >
                  <PlusIcon />
                  <span>New tag</span>
                </button>
              )}
              {editMode && (
                <button
                  onBlur={() => setEditMode(false)}
                  type="button"
                  className="new-tag"
                >
                  <PlusIcon />
                  <input
                    value={tagValue}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setTagValue(e.target.value)}
                    ref={callbackRef}
                  />
                </button>
              )}
            </StyledTagWrapper>
          </div>
          <div className="buttons">
            <Button
              loading={questionsLoading}
              onClick={handleCreate}
              color="primary"
              disabled={!tags.length}
            >
              Добавить
            </Button>
            <Link to="/" className="cancel">
              <Typography color="gray">Отмена</Typography>
            </Link>
          </div>
        </Paper>
      </StyledQuestionWrapper>
    </>
  );
};

export default CreateQuestion;
