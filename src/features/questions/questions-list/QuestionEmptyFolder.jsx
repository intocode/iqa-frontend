import React from 'react';
import styled from 'styled-components';
import Folder from '../../../components/icons/EmptyFolderIcon';

const StaledWrapper = styled.div`
  margin-top: 40px;
  p {
    color: #909399ff;
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
        <div>В данном разделе нет записей</div>
      </div>
    </StaledWrapper>
  );
};

export default QuestionEmptyFolder;
