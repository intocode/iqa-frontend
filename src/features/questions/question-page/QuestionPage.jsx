import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchQuestionById,
  selectOpenedQuestion,
  selectQuestionsFetching,
} from '../questionsSlice';
import { QuestionPagePlaceholder } from './QuestionPagePlaceholder';
import CommentsOfQuestion from '../../comments/CommentsOfQuestion';
import { QuestionPageHeader } from './QuestionPageHeader';
import { QuestionPageContent } from './QuestionPageContent';
import { Paper } from '../../../components/ui';

const { REACT_APP_FEATURE_COMMENTARIES } = process.env;

const QuestionPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const fetching = useSelector(selectQuestionsFetching);
  const question = useSelector(selectOpenedQuestion);

  useEffect(() => dispatch(fetchQuestionById(id)), [dispatch, id]);

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
