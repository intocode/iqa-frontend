/**
 * TODO
 *  close on outside click
 *  add controls with keyboard
 */

import PropTypes from 'prop-types';
import React, { Children, useState } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.div`
  & ul {
    margin: 0;
    padding: 0;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
`;

const StyledSelectLabel = styled.div`
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 9px 20px;
  color: #c0c4cc;
  cursor: pointer;

  margin-bottom: 10px;
`;

export const Select = ({ children, onChange, value, label }) => {
  const [open, setOpen] = useState(false);

  const childrenArray = Children.toArray(children);

  const items = childrenArray.map((child) =>
    React.cloneElement(child, {
      selected: child.props.value === value,
      onClick: () => {
        onChange(child.props.value);
        setOpen(false);
      },
    })
  );

  const selectedOption = childrenArray.find((child) => child.props.value === value)?.props
    ?.children;

  return (
    <StyledSelect>
      <StyledSelectLabel onClick={() => setOpen(!open)}>
        {selectedOption || label}
      </StyledSelectLabel>
      {open && <ul>{items}</ul>}
    </StyledSelect>
  );
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Select.defaultProps = {
  label: 'Выберите вариант',
  value: null,
};
