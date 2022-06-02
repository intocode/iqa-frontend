import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import SearchIcon from '../icons/SearchIcon';
import Search from './Search';

const StyledAnimatedSearch = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;

  .search-icon {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .search-form {
    transform: translateX(5%);
    transition: 0.2s;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transform: translateX(-10%);
    transition: opacity 100ms, transform 10ms;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: opacity 100ms, transform 10ms;
  }

  @media (max-width: 586px) {
    display: none;
  }
`;

const AnimatedSearch = () => {
  const [openSearch, setOpenSearch] = useState(true);

  return (
    <StyledAnimatedSearch>
      <SwitchTransition>
        <CSSTransition
          key={openSearch}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          classNames="fade"
        >
          {openSearch ? (
            <div role="presentation" onClick={() => setOpenSearch(false)}>
              <SearchIcon />
            </div>
          ) : (
            <div className="search-form" onBlur={() => setOpenSearch(true)}>
              <Search />
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </StyledAnimatedSearch>
  );
};

export default AnimatedSearch;
