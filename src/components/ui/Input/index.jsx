import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 8px;
  outline: 0;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 22px;

  &::placeholder {
    color: #c0c4cc;
  }
`;

export const Input = (props) => {
  return <StyledInput {...props} />;
};
