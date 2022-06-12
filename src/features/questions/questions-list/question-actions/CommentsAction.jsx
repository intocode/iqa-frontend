import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CommentsIcon from '../../../../components/icons/CommentsIcon';
import { questionSelectors } from '../../questionsSlice';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:visited {
    color: #000;
  }
`;

const StyledComments = styled.div`
  color: #409eff;
  font-weight: 400;
  font-size: 14px;
`;

export const CommentsAction = ({ questionId }) => {
  const { REACT_APP_FEATURE_COMMENTARIES } = process.env;

  const question = useSelector((state) =>
    questionSelectors.selectById(state, questionId)
  );

  if (!REACT_APP_FEATURE_COMMENTARIES) return null;

  return (
    <div className="col-auto">
      <StyledLink to={`/question/${question._id}#scroll`}>
        <div className="d-flex align-items-center">
          <div>
            <CommentsIcon />
          </div>
          <StyledComments className="d-none d-md-block">
            {question.commentsCount > 0 ? question.commentsCount : 'Обсуждение'}
          </StyledComments>
        </div>
      </StyledLink>
    </div>
  );
};

CommentsAction.propTypes = {
  questionId: PropTypes.string.isRequired,
};
