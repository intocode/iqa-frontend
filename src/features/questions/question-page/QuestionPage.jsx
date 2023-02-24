import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchQuestionById,
  selectOpenedQuestion,
  selectQuestionsFetching,
} from 'features/questions/questionsSlice';
import CommentsOfQuestion from 'features/comments/CommentsOfQuestion';
import { Paper } from 'components/layout/Paper';
import { QuestionPagePlaceholder } from './QuestionPagePlaceholder';
import { QuestionPageHeader } from './QuestionPageHeader';
import { QuestionPageContent } from './QuestionPageContent';

const { REACT_APP_FEATURE_COMMENTARIES } = process.env;

const QuestionPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const fetching = useSelector(selectQuestionsFetching);
  const question = useSelector(selectOpenedQuestion);

  useEffect(() => {
    dispatch(fetchQuestionById(id));
  }, [dispatch, id]);

  return (
    <div className="container">
      <QuestionPageHeader />

      <Paper>
        {fetching || !question ? <QuestionPagePlaceholder /> : <QuestionPageContent />}

        {REACT_APP_FEATURE_COMMENTARIES && <CommentsOfQuestion />}
      </Paper>
    </div>
  );
};

export default QuestionPage;
