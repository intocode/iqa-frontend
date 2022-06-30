import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseIcon from '../../icons/CloseIcon';

const StyledTag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 5px;
  border: 1px solid transparent;

  border-radius: 4px;
  line-height: 20px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray.main};

  &::before {
    content: '#';
    margin-right: 1px;
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.gray.main};
    background: ${(props) => props.theme.colors.gray.addition};
    cursor: pointer;
  }

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
        <CloseIcon />
      </button>
    )}
  </StyledTag>
);

Tag.propTypes = {
  children: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};

Tag.defaultProps = {
  onRemove: undefined,
};
