import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { AVAILABLE_THEME_COLORS, DEFAULT_COLOR } from '../../../app/constants';

const StyledTypography = styled.div`
  color: ${(props) => props.theme.colors[props.color].main};

  ${(props) => {
    if (props.variant === 'header') {
      return css`
        font-size: 24px;
        font-weight: 500;
      `;
    }

    if (props.variant === 'caption') {
      return css`
        font-size: 16px;
        font-weight: 500;
      `;
    }

    if (props.variant === 'small') {
      return css`
        font-size: 12px;
        font-weight: 400;
      `;
    }

    if (props.variant === 'extraSmall') {
      return css`
        font-size: 9px;
        font-weight: 400;
      `;
    }

    return css`
      font-size: inherit;
    `;
  }};
`;

export const Typography = ({ variant, children, ...props }) => (
  <StyledTypography {...props} variant={variant}>
    {children}
  </StyledTypography>
);

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(AVAILABLE_THEME_COLORS),
  variant: PropTypes.oneOf(['header', 'caption', 'small', 'extraSmall']),
};

Typography.defaultProps = {
  color: DEFAULT_COLOR,
  variant: 'caption',
};
