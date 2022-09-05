import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FavoriteAction } from './FavoriteAction';
import { CommentsAction } from './CommentsAction';
import { DeleteAction } from './DeleteAction';
import QuestionViews from './QuestionViews';
import { RestoreAction } from './RestoreAction';

const QuestionsActionsWrapper = styled.div`
  margin-top: -10px;
`;

export const QuestionsActions = ({ questionId }) => {
  return (
    <QuestionsActionsWrapper>
      <div className="row justify-content-end justify-content-md-start">
        <FavoriteAction questionId={questionId} />
        <CommentsAction questionId={questionId} />
        <QuestionViews questionId={questionId} />
        <DeleteAction questionId={questionId} />
        <RestoreAction questionId={questionId} />
      </div>
    </QuestionsActionsWrapper>
  );
};

QuestionsActions.propTypes = {
  questionId: PropTypes.string.isRequired,
};
