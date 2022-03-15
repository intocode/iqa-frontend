import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChevronUpIcon from '../icons/ChevronUpIcon';

const StyledScroll = styled.div`
  display: inline-block;
  width: 45px;
  height: 45px;
  background-color: ${(props) => props.theme.colors.primary.main};
  border-radius: 100%;
  padding: 8px;
  cursor: pointer;
  position: fixed;
  bottom: 60px;
  right: 20px;
  box-shadow: 0 0 10px ${(props) => props.theme.colors.primary.main};
`;

export const ScrollToTop = () => {
  const [windowScroll, setWindowScroll] = useState(window.pageYOffset);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setWindowScroll(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!windowScroll) return null;

  return (
    <StyledScroll onClick={scrollToTop}>
      <ChevronUpIcon />
    </StyledScroll>
  );
};
