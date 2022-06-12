import { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Title } from '../../app/Title/Title';
import PlusIcon from '../../components/icons/PlusIcon';
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
  selectTags,
  selectTagsError,
} from '../tags/tagsSlice';
import { addQuestion, selectQuestionsFetching } from './questionsSlice';
import { useAuth } from '../../common/context/Auth/useAuth';

const StyledQuestionWrapper = styled.div`
  & .buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & button {
      margin-right: 25px;
    }
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
  margin: 1.5rem 0;
`;

const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 36px;
    height: 36px;
    border-radius: 1.5rem;
    margin-right: 0.5rem;
  }
`;

const CreateQuestion = () => {
  const dispatch = useDispatch();
  const editorRef = useRef();

  const profile = useSelector(selectProfile);
  const tags = useSelector(selectTags);
  const tagsError = useSelector(selectTagsError);
  const questionsLoading = useSelector(selectQuestionsFetching);

  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [manyQuestions, setManyQuestions] = useState(false);
  const { token } = useAuth();

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

  useEffect(() => {
    if (/\?[^?]+\?/.test(question)) {
      setManyQuestions(true);
    } else {
      setManyQuestions(false);
    }
  }, [question]);

  if (!token) return <Redirect to="/" />;

  const { REACT_APP_FEATURE_TAGS } = process.env;

  return (
    <>
      <Title>iqa: добавить вопрос</Title>
      <StyledQuestionWrapper className="container">
        <StyledTitle>
          <h3>Добавление вопроса</h3>
        </StyledTitle>
        <Paper>
          <StyledProfile>
            <img src={profile.avatar?.thumbnail} alt="avatar" />
            <p>{profile.name}</p>
          </StyledProfile>
          {tagsError && <Alert сolor="danger">{tagsError}</Alert>}
          {manyQuestions && (
            <Alert color="warning">
              В одном посте рекомендуется публиковать только один вопрос.
            </Alert>
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
              autofocus={false}
            />
            {REACT_APP_FEATURE_TAGS && (
              <>
                <div className="mt-4 mb-3">
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
              </>
            )}
          </div>
          <div className="buttons mt-4">
            <Button
              loading={questionsLoading}
              onClick={handleCreate}
              color="primary"
              disabled={REACT_APP_FEATURE_TAGS && !tags.length}
            >
              Опубликовать
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
