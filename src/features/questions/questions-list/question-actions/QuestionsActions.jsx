import React from 'react';
import PropTypes from 'prop-types';

import { FavoriteAction } from './FavoriteAction';
import { CommentsAction } from './CommentsAction';
import { DeleteAction } from './DeleteAction';

export const QuestionsActions = ({ questionId }) => {
  return (
    <div className="row justify-content-end justify-content-md-start">
      <FavoriteAction questionId={questionId} />
      <CommentsAction questionId={questionId} />
      <DeleteAction questionId={questionId} />
    </div>
  );
};

QuestionsActions.propTypes = {
  questionId: PropTypes.string.isRequired,
};
