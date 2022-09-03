import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCaption = styled.div`
  color: ${(props) => props.color};
  margin-left: 3px;
`;

export const TheQuestionAction = ({ icon, children, onClick, color }) => {
  return (
    <div className="col-auto">
      <div role="button" aria-hidden onClick={onClick} className="d-flex align-items-center">
        {icon}
        <StyledCaption color={color}>{children}</StyledCaption>
      </div>
    </div>
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
