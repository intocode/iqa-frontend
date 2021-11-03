import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

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
        font-size: 12px;
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
  children: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['danger', 'gray', 'warning', 'success']),
  variant: PropTypes.oneOf(['header', 'caption', 'small', 'extraSmall']),
};

Typography.defaultProps = {
  color: 'success',
  variant: 'caption',
};
