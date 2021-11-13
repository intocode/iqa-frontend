import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/close.svg';
import { AVAILABLE_THEME_COLORS, DEFAULT_COLOR } from '../../../app/constants';

const StyledTag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: ${(props) => (props.noGutters ? '2px 8px' : '5px 8px')};

  ${(props) => css`
    color: ${props.theme.colors[props.color].main};
    background-color: ${props.theme.colors[props.color].addition};
    border: 1px solid ${props.theme.colors[props.color].main};
  `}

  button {
    cursor: pointer;
    background-color: inherit;
    border: none;
    margin-left: 12px;
    display: inherit;
  }
`;

export const Tag = ({ children, onRemove, ...props }) => (
  <StyledTag {...props}>
    {children}
    {onRemove && (
      <button type="button" onClick={onRemove}>
        <img src={closeIcon} alt="" />
      </button>
    )}
  </StyledTag>
);

Tag.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.oneOf(AVAILABLE_THEME_COLORS),
  onRemove: PropTypes.func,
  noGutters: PropTypes.bool,
};

Tag.defaultProps = {
  color: DEFAULT_COLOR,
  onRemove: undefined,
  noGutters: false,
};
