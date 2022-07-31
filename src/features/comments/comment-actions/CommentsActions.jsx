import React from 'react';
import PropTypes from 'prop-types';
import { DeleteAction } from './DeleteAction';

export const CommentsActions = ({ commentId }) => {
  return (
    <div>
      <DeleteAction commentId={commentId} />
    </div>
  );
};

CommentsActions.propTypes = {
  commentId: PropTypes.string.isRequired,
};
