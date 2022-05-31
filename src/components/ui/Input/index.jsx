import { forwardRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 8px;
  outline: 0;
  box-sizing: border-box;
  &::-webkit-input-placeholder {
    color: rgba(192, 196, 204, 1);
  }
  font-family: inherit;
`;

export const Input = forwardRef((props, ref) => {
  return <StyledInput {...props} ref={ref} />;
});
