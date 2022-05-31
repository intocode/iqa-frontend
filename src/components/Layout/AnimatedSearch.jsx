import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import SearchIcon from '../icons/SearchIcon';
import '../../assets/animation-open-search.css';
import Search from './Search';

const StyledAnimatedSearch = styled.div`
  display: flex;
  align-items: center;

  .search-icon {
    display: flex;
    align-items: center;
  }
`;

const AnimatedSearch = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const nodeRef = useRef(null);

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  return (
    <StyledAnimatedSearch
      onClick={handleOpenSearch}
      className="search-box"
      onBlur={() => setOpenSearch(false)}
    >
      <CSSTransition
        in={!openSearch}
        timeout={100}
        classNames="fade"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <SearchIcon />
      </CSSTransition>

      <CSSTransition
        in={openSearch}
        timeout={100}
        classNames="fade"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <Search nodeRef={nodeRef} />
      </CSSTransition>
    </StyledAnimatedSearch>
  );
};

export default AnimatedSearch;
