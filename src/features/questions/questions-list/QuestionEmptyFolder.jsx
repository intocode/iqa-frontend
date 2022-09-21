import React from 'react';
import styled from 'styled-components';
import EmptyFolderIcon from 'components/icons/EmptyFolderIcon';
import { theme } from 'app/theme';

const StaledWrapper = styled.div`
  margin-top: 40px;
  .noEntry {
    color: ${theme.colors.gray.main};
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
        <EmptyFolderIcon />
        <div className="noEntry">В данном разделе нет записей</div>
      </div>
    </StaledWrapper>
  );
};

export default QuestionEmptyFolder;
