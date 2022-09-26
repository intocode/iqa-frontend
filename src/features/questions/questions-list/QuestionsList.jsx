import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Modal, Spin, Switch } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
import QuestionsListMapper from './QuestionsListMapper';
import QuestionEmptyFolder from './QuestionEmptyFolder';
import { patchFullName, selectProfile } from '../../profile/profileSlice';

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
  };

  const profile = useSelector(selectProfile);

  const [value, setValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  const id = profile._id;

  const handleSubmit = () => {
    dispatch(patchFullName({ id, value, emailValue }));
    setValue('');
    setEmailValue('');
  };

  return (
    <>
      <Modal open={!profile.fullName} footer={null} destroyOnClose>
        <div>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Введите имя и фамилию"
          />
          <Input
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            type="text"
            placeholder="Введите Email"
          />
          <Button onClick={handleSubmit} type="button">
            Сохранить
          </Button>
        </div>
      </Modal>
      <Title>{`iqa: ${generatedTitle}`}</Title>
      <div className="container">
        <div className="row justify-content-between align-items-center my-3">
          <div className="col">
            <h2>{generatedTitle}</h2>
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
