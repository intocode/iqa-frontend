import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledSelectItem = styled.li`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 9px 20px;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      color: ${props.theme.palette.blue[900]};
    `};

  &:hover {
    background-color: whitesmoke;
  }
`;

export const SelectItem = ({ selected, children, ...props }) => (
  <StyledSelectItem selected={selected} {...props}>
    {children}
    {/* todo: if selected icon  */}
  </StyledSelectItem>
);

SelectItem.propTypes = {
  children: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

SelectItem.defaultProps = {
  selected: false,
};
