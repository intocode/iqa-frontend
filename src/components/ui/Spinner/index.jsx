import styled, { keyframes } from 'styled-components';
import { theme } from '../../../app/theme';

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
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: conic-gradient(${theme.colors.gray.main}, transparent);
    margin: auto;
    animation: ${spin} 1s linear infinite;
  }

  &::before {
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
