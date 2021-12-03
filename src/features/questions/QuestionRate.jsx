import React, { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Rate } from '../../components/ui';
import { useAuth } from '../../common/context/Auth/useAuth';
import { selectProfile } from '../profile/profileSlice';
import { addRate, selectQuestionById } from './questionsSlice';

// при изменении оценки компонент рендериться и для других вопросов, которые неизменчивы
const QuestionRate = ({ id }) => {
  const { token } = useAuth();

  const dispatch = useDispatch();

  const question = useSelector(selectQuestionById(id));
  const profile = useSelector(selectProfile);

  let isUpped = false;
  let isDowned = false;

  const valueRate = useMemo(
    () => question.rates.reduce((acc, item) => acc + item.volume, 0),
    [question]
  );

  if (token) {
    question.rates.forEach((item) => {
      if (item.user === profile._id && item.volume === 1) {
        isUpped = true;
      }

      if (item.user === profile._id && item.volume === -1) {
        isDowned = true;
      }
    });
  }

  const handleChangeRate = (data) => {
    dispatch(addRate(data));
  };

  if (!token) {
    return <Rate currentRate={valueRate} />;
  }

  return (
    <Rate
      isUpped={isUpped}
      isDowned={isDowned}
      onUp={() => handleChangeRate({ volume: 1, id: question._id })}
      onDown={() => handleChangeRate({ volume: -1, id: question._id })}
      currentRate={valueRate}
    />
  );
};

export default memo(QuestionRate);

QuestionRate.propTypes = {
  id: PropTypes.string.isRequired,
};
