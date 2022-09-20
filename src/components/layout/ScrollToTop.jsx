import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { SCROLL_TO_TOP_SHOW } from 'app/constants';
import ChevronUpIcon from 'components/icons/ChevronUpIcon';
import 'assets/animation-back-to-top.css';

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
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setWindowScroll(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (windowScroll > SCROLL_TO_TOP_SHOW) {
      setShowBackToTop(true);
    } else setShowBackToTop(false);
  }, [windowScroll]);

  return (
    <CSSTransition in={showBackToTop} timeout={200} classNames="alert" unmountOnExit>
      <StyledScroll onClick={scrollToTop}>
        <ChevronUpIcon />
      </StyledScroll>
    </CSSTransition>
  );
};
