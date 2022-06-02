import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import SearchIcon from '../icons/SearchIcon';
import Search from './Search';

const StyledAnimatedSearch = styled.div`
  width: 200px;
  display: flex;
  align-items: center;

  .search-icon {
    display: flex;
    align-items: center;
  }

  .search-form {
    transform: translateX(5%);
    transition: 0.4s;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transform: translateX(-10%);
    transition: opacity 250ms, transform 50ms;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: opacity 250ms, transform 50ms;
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
