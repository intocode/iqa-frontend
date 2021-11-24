import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Paper } from '../../components/ui/Paper';
import { Tag } from '../../components/ui/Tag';
import { Rate } from '../../components/ui/Rate';
import { addRate } from './questionsSlice';

const StyledQuestionBlock = styled.div`
  & > div {
    margin-bottom: 20px;
  }
`;

const StyledPaperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const StyledAvatr = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 24px;
  }
  & > div {
    color: #909399;
    font-size: 12px;
    margin-left: 10px;
  }
`;

const StyledTag = styled.div`
  display: flex;
  & > div {
    margin-right: 10px;
  }
  & > div:last-child {
    margin-right: 0;
  }
`;

export const QuestionBlock = ({
  question,
  user,
  tags,
  rate,
  isDowned,
  isUpped,
}) => {
  const dispatch = useDispatch();

  const [colorOfRate, setColorOfRate] = useState({
    isUpped,
    isDowned,
  });

  const handleRateUp = (data) => {
    dispatch(addRate(data));
    setColorOfRate({
      ...colorOfRate,
      isUpped: !colorOfRate.isUpped,
      isDowned: false,
    });
  };

  const handleRateDown = (data) => {
    dispatch(addRate(data));
    setColorOfRate({
      ...colorOfRate,
      isDowned: !colorOfRate.isDowned,
      isUpped: false,
    });
  };
  return (
    <StyledQuestionBlock>
      <Paper>
        <StyledPaperHeader>
          <StyledAvatr>
            <img src={user.avatarURL} alt="" />
            <p>{user.name}</p>
            <div>{question.date}</div>
          </StyledAvatr>
          <StyledTag>
            {tags.map((tag) => (
              <Tag key={tag.name} noGutters>
                {tag.name}
              </Tag>
            ))}
          </StyledTag>
        </StyledPaperHeader>
        <h3>{question.question}</h3>
        <Rate
          isUpped={colorOfRate.isUpped}
          isDowned={colorOfRate.isDowned}
          onUp={() => handleRateUp({ volume: 1, id: question.id })}
          onDown={() => handleRateDown({ volume: -1, id: question.id })}
          currentRate={rate}
        />
      </Paper>
    </StyledQuestionBlock>
  );
};

QuestionBlock.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,

  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
  }).isRequired,

  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,

  rate: PropTypes.number.isRequired,
  isUpped: PropTypes.bool,
  isDowned: PropTypes.bool,
};

QuestionBlock.defaultProps = {
  isUpped: false,
  isDowned: false,
};
