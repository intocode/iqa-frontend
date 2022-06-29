import React from 'react';
import PropTypes from 'prop-types';

import { FavoriteAction } from './FavoriteAction';
import { CommentsAction } from './CommentsAction';
import { DeleteAction } from './DeleteAction';
import QuestionViews from '../QuestionViews';

export const QuestionsActions = ({ questionId }) => {
  return (
    <div className="row justify-content-end justify-content-md-start">
      <FavoriteAction questionId={questionId} />
      <CommentsAction questionId={questionId} />
      <QuestionViews questionId={questionId} />
      <DeleteAction questionId={questionId} />
    </div>
  );
};

QuestionsActions.propTypes = {
  questionId: PropTypes.string.isRequired,
};
