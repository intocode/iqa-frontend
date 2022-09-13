import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Switch } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import {
  fetchQuestions,
  fetchNextPartOfQuestions,
  selectQuestionsFetching,
  resetQuestionsList,
  questionSelectors,
} from '../questionsSlice';
import { selectIsCompactModeToogle, toggleIsCompactMode } from '../../application/applicationSlice';
import { Title } from '../../../app/Title/Title';
import { Paper } from '../../../components/ui';
import { useOnScroll } from '../../../common/hooks/useOnScroll';
import QuestionsListMapper from './QuestionsListMapper';
import { useQueryString } from '../../../common/hooks/useQueryString';
import QuestionEmptyFolder from './QuestionEmptyFolder';
import { generateTitle } from '../../../common/utils/title';

const StyledSwitchBlock = styled.span`
  color: #409eff;
  cursor: pointer;
`;

const QuestionsList = () => {
  const dispatch = useDispatch();

  const queryString = useQueryString();
  const favoritesOnly = queryString.get('favoritesOnly');
  const deletedOnly = queryString.get('deletedOnly');

  const fetching = useSelector(selectQuestionsFetching);
  const isCompactMode = useSelector(selectIsCompactModeToogle);

  const [enableSwitch, setEnableSwitch] = useState(false);

  const questionsIds = useSelector(questionSelectors.selectIds);

  const scrollHandler = useCallback(
    (e) => {
      // граница, по мере придвижения к которой делается скролл
      const scrollBorder = 100;

      const { documentElement } = e.target;
      const position =
        documentElement.scrollHeight - (documentElement.scrollTop + window.innerHeight);

      if (position < scrollBorder) {
        dispatch(fetchNextPartOfQuestions({ favoritesOnly, deletedOnly }));
      }
    },
    [deletedOnly, dispatch, favoritesOnly]
  );

  useOnScroll(scrollHandler);

  useEffect(() => {
    /**
     * Если переключились между категорией вывода вопросов, то нужно сбросить
     * отступы из пагинации, чтобы загрузка началась с нуля и очистить массив вопросов.
     * Поэтому в зависимостях переменные, на которые нужно триггериться
     */
    dispatch(resetQuestionsList());
  }, [deletedOnly, dispatch, favoritesOnly]);

  useEffect(() => {
    dispatch(fetchQuestions({ favoritesOnly, deletedOnly }));
  }, [deletedOnly, dispatch, favoritesOnly]);

  const QuestionWrapper = isCompactMode ? Paper : React.Fragment;
  const generatedTitle = generateTitle(deletedOnly, favoritesOnly);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 36,
      }}
      spin
    />
  );

  const handleClickSwitch = () => {
    dispatch(toggleIsCompactMode());
    setEnableSwitch(!enableSwitch);
  };

  return (
    <>
      <Title>{`iqa: ${generatedTitle}`}</Title>
      <div className="container">
        <div className="row justify-content-between align-items-center my-3">
          <div className="col">
            <h2>{generatedTitle}</h2>
          </div>
          <div className="col-auto">
            <Switch checked={enableSwitch} onClick={handleClickSwitch} />
            <StyledSwitchBlock
              role="button"
              data-testid="compact-mode-label"
              onClick={handleClickSwitch}
              className="ms-3"
            >
              Компактный вид
            </StyledSwitchBlock>
          </div>
        </div>
        {!questionsIds.length && !fetching ? (
          <QuestionEmptyFolder />
        ) : (
          <QuestionWrapper>
            <QuestionsListMapper />
          </QuestionWrapper>
        )}
        {fetching && (
          <div className="d-flex justify-content-center">
            <Spin indicator={antIcon} />
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionsList;
