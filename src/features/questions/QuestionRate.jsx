import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Rate } from '../../components/ui/Rate';
import { useAuth } from '../../common/context/Auth/useAuth';
import { selectProfile } from '../profile/profileSlice';
import { addRate, selectQuestionById } from './questionsSlice';

const QuestionRate = ({ id }) => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const question = useSelector(selectQuestionById(id));
  const profile = useSelector(selectProfile);

  let isUpped = false;
  let isDowned = false;

  const valueRate = question.rates.reduce((acc, item) => {
    return acc + item.volume;
  }, 0);

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
    if (token) {
      dispatch(addRate(data));
    }
  };

  return (
    <>
      {token ? (
        <Rate
          isUpped={isUpped}
          isDowned={isDowned}
          onUp={() => handleChangeRate({ volume: 1, id: question._id })}
          onDown={() => handleChangeRate({ volume: -1, id: question._id })}
          currentRate={valueRate}
        />
      ) : (
        <Rate currentRate={valueRate} />
      )}
    </>
  );
};

export default QuestionRate;

QuestionRate.propTypes = {
  id: PropTypes.string.isRequired,
};
