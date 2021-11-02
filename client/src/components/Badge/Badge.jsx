import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
`;

const StyledBadge = styled.span`
  position: absolute;
  ${(props) => {
    if (!props.content) {
      return css`
        top: -1px;
        right: 9px;
        width: 10px;
        height: 10px;
        background-color: ${(props) => {
          return props.theme.colors[props.color].main;
        }};
        border: 1px solid #ffffff;
        border-radius: 50%;
      `;
    }
    return css`
      top: -4px;
      right: 0;
      background-color: ${(props) => {
        return props.theme.colors[props.color].main;
      }};
      color: #ffffff;
      border-radius: 24px;
      font-size: 13px;
      padding: 1px 7px;
      :after {
        content: '${(props) => props.content}';
      }
    `;
  }}
`;

export const Badge = ({ color, content, children }) => {
  return (
    <StyledDiv>
      {children}
      <StyledBadge color={color} content={content} />
    </StyledDiv>
  );
};

Badge.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['danger', 'warning', 'success', 'gray']),
  content: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
};

Badge.defaultProps = {
  content: null,
  color: 'danger',
};
