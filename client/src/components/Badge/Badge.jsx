import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  background: #ffffff;
  border: ${(props) => (props.content ? '1px solid #e4e7ed' : 'none')};
  outline: none;
  line-height: 20px;
`;

const StyledBadge = styled.span`
  ${(props) => {
    if (!props.content) {
      return css`
        position: absolute;
        top: +1px;
        right: +7px;
        width: 10px;
        height: 10px;
        background: #f56c6c;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ffffff;
        border-radius: 50%;
      `;
    }
    return css`
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: ${(props) => {
        return props.theme.colors[props.color].main;
      }};
      color: #ffffff;
      display: inline-block;
      justify-content: center;
      align-items: center;
      border-radius: 24px;
      padding: 1px 7px;
      :after {
        content: '${(props) => props.content}';
      }
    `;
  }}
`;

export const Badge = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      <StyledBadge {...props} />
      {children}
    </StyledButton>
  );
};

Badge.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['danger', 'warning', 'primary']),
  content: PropTypes.string,
};

Badge.defaultProps = {
  content: null,
  color: 'danger',
};
