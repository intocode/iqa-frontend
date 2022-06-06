import styled, { keyframes } from 'styled-components';

const spin = keyframes`
from {
    transform: rotate(360deg)
}
to {
    transform: rotate(0deg)
} 
`;

const StyledSpinner = styled.div`
  & {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: conic-gradient(lightgray, transparent);
  }

  & {
    margin: auto;
  }

  & {
    animation: ${spin} 1s linear infinite;
  }

  &:before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: white;
    top: 10px;
    left: 10px;
  }
`;

export const Spinner = () => {
  return <StyledSpinner />;
};
