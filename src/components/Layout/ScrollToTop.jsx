import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChevronUpIcon from '../icons/ChevronUpIcon';

const StyledScroll = styled.div`
  display: inline-block;
  width: 45px;
  height: 45px;
  background-color: ${(props) => props.theme.colors[props.color].main};
  border-radius: 100%;
  padding: 8px;
  cursor: pointer;
  position: fixed;
  bottom: 60px;
  right: 20px;
  box-shadow: 0 0 10px ${(props) => props.theme.colors[props.color].main};
`;

export const ScrollToTop = ({ color }) => {
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

  return windowScroll === 0 ? null : (
    <StyledScroll color={color}>
      <ChevronUpIcon color="#fff" onClick={scrollToTop} />
    </StyledScroll>
  );
};

ScrollToTop.propTypes = {
  color: PropTypes.string.isRequired,
};
