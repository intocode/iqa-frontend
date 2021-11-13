import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { AVAILABLE_THEME_COLORS, DEFAULT_COLOR } from '../../../app/constants';

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
        background-color: ${props.theme.colors[props.color].main};
        border: 1px solid #ffffff;
        border-radius: 50%;
      `;
    }
    return css`
      top: -4px;
      right: 0;
      background-color: ${props.theme.colors[props.color].main};
      color: #ffffff;
      border-radius: 24px;
      font-size: 13px;
      padding: 1px 7px;
      :after {
        content: '${props.content}';
      }
    `;
  }}
`;

export const Badge = ({ color, content, children }) => (
  <StyledDiv>
    {children}
    <StyledBadge color={color} content={content} />
  </StyledDiv>
);

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(AVAILABLE_THEME_COLORS),
  content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Badge.defaultProps = {
  content: null,
  color: DEFAULT_COLOR,
};
