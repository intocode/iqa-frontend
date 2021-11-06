import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 0.5em;
  outline: 0;
`;

export const Input = (props) => {
  return <StyledInput {...props} />;
};
