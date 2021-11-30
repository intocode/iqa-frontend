import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import commentsLogo from "../../assets/comments.svg"

const StyledCommentsBlock = styled.div`
  display: flex;
  align-items: center;     /*Центрирование по вертикали */
  
  & > span {
    font-size: small;
    color: #409EFF;
    margin-left: 7px;
  }
`

const CommentsLogo = ({comments}) => {
  const image = commentsLogo

  return (
    <StyledCommentsBlock>
      <img src={image} alt="" />
      <span>{comments}</span>
    </StyledCommentsBlock>
  );
};

export default CommentsLogo;

CommentsLogo.propTypes = {
  comments: PropTypes.node
};

CommentsLogo.defaultProps = {
  comments: "Обсуждение"
};