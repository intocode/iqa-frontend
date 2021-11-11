import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Paper } from '../../components/Paper';
import { Tag } from '../../components/Tag';
import { Rate } from '../../components/Rate';

const StyledQuestionBlock = styled.div`
  width: 50%;
  margin: auto;
  & > div {
    margin-bottom: 20px;
  }
`;

const StyledPaperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  name,
  currentRate,
  date,
  tag,
  avatar,
}) => {
  return (
    <StyledQuestionBlock>
      <Paper>
        <StyledPaperHeader>
          <StyledAvatr>
            <img src={avatar} alt="" />
            <p>{name}</p>
            <div>{date}</div>
          </StyledAvatr>
          <StyledTag>
            {tag.map((item) => {
              return <Tag>{item.name}</Tag>;
            })}
          </StyledTag>
        </StyledPaperHeader>
        <h3>{question}</h3>
        <div>
          <Rate currentRate={currentRate} />
        </div>
      </Paper>
    </StyledQuestionBlock>
  );
};

QuestionBlock.propTypes = {
  question: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  currentRate: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  tag: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
