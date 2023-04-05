import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin, Switch } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Title } from 'app/Title/Title';
import {
  fetchQuestions,
  fetchNextPartOfQuestions,
  selectQuestionsFetching,
  resetQuestionsList,
  questionSelectors,
} from 'features/questions/questionsSlice';
import { Paper } from 'components/layout/Paper';
import {
  selectIsCompactModeToogle,
  toggleIsCompactMode,
} from 'features/application/applicationSlice';
import { useOnScroll } from 'common/hooks/useOnScroll';
import { generateTitle } from 'common/utils/title';
import { useQueryString } from 'common/hooks/useQueryString';
import { Link } from 'react-router-dom';
import QuestionsListMapper from './QuestionsListMapper';
import QuestionEmptyFolder from './QuestionEmptyFolder';

const StyledSwitchBlock = styled.span`
  display: none;

  @media screen and (min-width: 576px) {
    color: #409eff;
    cursor: pointer;
    display: inline;
  }
`;

const QuestionsList = () => {
  const dispatch = useDispatch();

  const queryString = useQueryString();
  const favoritesOnly = queryString.get('favoritesOnly');
  const deletedOnly = queryString.get('deletedOnly');

  const fetching = useSelector(selectQuestionsFetching);
  const isCompactMode = useSelector(selectIsCompactModeToogle);

  const questionsIds = useSelector(questionSelectors.selectIds);
  const questionsAll = useSelector(questionSelectors.selectAll);

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
    if (!questionsAll.length) {
      dispatch(fetchQuestions({ favoritesOnly, deletedOnly }));
    }
  }, [deletedOnly, dispatch, favoritesOnly, questionsAll.length]);

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
  };

  return (
    <>
      <Title>{`iqa: ${generatedTitle}`}</Title>
      <div className="container">
        <div className="row align-items-center justify-content-start my-3">
          <div className="col d-flex align-items-center justify-content-start">
            <h2 className="m-0">{generatedTitle}</h2>
            <Link to="/create" className="d-sm-block d-md-none">
              <Button className="mx-3" type="primary" shape="plus" icon={<PlusOutlined />} />
            </Link>
          </div>
          <div className="col-auto">
            <Switch checked={isCompactMode} onClick={handleClickSwitch} />
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
