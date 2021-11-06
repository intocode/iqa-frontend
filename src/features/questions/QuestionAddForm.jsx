import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addQuestionThunk,
  selectErrorQuestion,
  selectLoadingQuestion,
  resetStatus,
} from './questionSlice';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';

const QuestionAddForm = () => {
  const dispatch = useDispatch();
  const [questionText, setQuestionText] = useState('');
  const [commentText, setCommentText] = useState('');
  const loading = useSelector(selectLoadingQuestion);
  const error = useSelector(selectErrorQuestion);
  const user = useSelector((state) => state.profile.data);

  const styles = {
    imageBlock: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  };

  if (!user) {
    return <h3>Loading</h3>;
  }

  const handleClick = () => {
    dispatch(
      addQuestionThunk({
        question: questionText,
        comment: commentText,
      })
    );
    setQuestionText('');
    setCommentText('');
  };

  return (
    <div className="q pt-5">
      <div className="row mb-3 align-items-center">
        <div className="col-auto">
          <div className="img" style={styles.imageBlock}>
            <img src={user.avatarURL} alt="" style={styles.image} />
          </div>
        </div>
        <div className="col-auto">{user.name}</div>
      </div>
      <div className="row mb-5">
        {error ? (
          <Alert
            color="danger"
            style={{
              margin: 'auto',
              width: 400,
            }}
            onClose={() => {
              dispatch(resetStatus());
            }}
          >
            {error}
          </Alert>
        ) : (
          ''
        )}
        <div className="col-12">
          <input
            style={{ width: '100%' }}
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-12">
          <input
            style={{ width: '100%' }}
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <Button loading={loading} onClick={handleClick}>
            Добавить
          </Button>
        </div>
        <div className="col-1">
          <Button>Отмена</Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionAddForm;
