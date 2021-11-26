import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '../../components/ui/Paper';
import { Tag } from '../../components/ui/Tag';
import { Rate } from '../../components/ui/Rate';
import { addRate } from './questionsSlice';
import { selectProfile } from '../profile/profileSlice';
import { useAuth } from '../../common/context/Auth/useAuth';

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

export const QuestionBlock = ({ question, user, tags, rates }) => {
  const { token } = useAuth();

  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);

  let isUpped = false;
  let isDowned = false;

  const valueRate = rates.reduce((acc, item) => {
    // eslint-disable-next-line no-param-reassign
    if (item.volume === -1) acc -= 1;
    // eslint-disable-next-line no-param-reassign
    if (item.volume === 1) acc += 1;
    return acc;
  }, 0);

  if (token) {
    rates.forEach((item) => {
      if (item.user === profile._id && item.volume === 1) {
        isUpped = true;
      }
      if (item.user === profile._id && item.volume === -1) {
        isDowned = true;
      }
    });
  }

  const handleRateUp = (data) => {
    if (token) {
      dispatch(addRate(data));
    }
  };

  const handleRateDown = (data) => {
    if (token) {
      dispatch(addRate(data));
    }
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
        {token ? (
          <Rate
            isUpped={isUpped}
            isDowned={isDowned}
            onUp={() => handleRateUp({ volume: 1, id: question.id })}
            onDown={() => handleRateDown({ volume: -1, id: question.id })}
            currentRate={valueRate}
          />
        ) : (
          <Rate currentRate={valueRate} />
        )}
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

  rates: PropTypes.arrayOf.isRequired,
};
