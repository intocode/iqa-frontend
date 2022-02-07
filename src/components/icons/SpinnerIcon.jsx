import React from 'react';
import styled from 'styled-components';

const StyledLoading = styled.div`
  display: inline-block;
  margin-right: 8px;
  position: relative;
  width: 11px;
  height: 11px;
  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 14px;
    height: 14px;
    border: 2px solid #e6a23c;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #e6a23c transparent transparent transparent;
  }
  & > div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & > div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & > div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function SpinnerIcon() {
  return (
    <StyledLoading>
      <div />
      <div />
      <div />
      <div />
    </StyledLoading>
  );
}

export default SpinnerIcon;
