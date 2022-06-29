import React from 'react';
import styled from 'styled-components';
import Folder from '../../../components/icons/Folder';

const StaledWrapper = styled.div`
  display: flex;
  height: 400px;
  p {
    color: rgba(144, 147, 153, 1);
    font-size: 22px;
    font-weight: 400;
  }
  .inner {
    text-align: center;
    margin: auto;
  }
`;

const QuestionEmptyFolder = () => {
  return (
    <StaledWrapper>
      <div className="inner">
        <Folder />
        <p>В данном разделе нет записей</p>
      </div>
    </StaledWrapper>
  );
};

export default QuestionEmptyFolder;
