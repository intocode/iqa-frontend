import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCaption = styled.div`
  color: ${(props) => props.color};
  margin-left: 3px;
`;

const QuestionActionWrapper = styled.div`
  svg {
    cursor: pointer;
  }
`;

export const TheQuestionAction = ({ icon, children, onClick, color }) => {
  return (
    <QuestionActionWrapper className="col-auto">
      <div role="button" aria-hidden onClick={onClick} className="d-flex align-items-center">
        {icon}
        <StyledCaption color={color}>{children}</StyledCaption>
      </div>
    </QuestionActionWrapper>
  );
};

TheQuestionAction.propTypes = {
  icon: PropTypes.node.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  color: PropTypes.string,
};

TheQuestionAction.defaultProps = {
  color: 'inherit',
  onClick: () => {},
  children: '',
};
