import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import favorites from '../../assets/favorites.svg';
import favoritesIn from '../../assets/favoritesIn.svg';

const StyledFavoritBlock = styled.div`
  display: flex;
  align-items: center;     /*Центрирование по вертикали */
  
  & > span {
    font-size: small;
    color: #E6A23C;
    margin-left: 7px;
  }
`

const Favorites = ({colorOn, colorOff}) => {
  let image = favorites

  if (colorOn) {
     image = favoritesIn
  }

  if (colorOff) {
    image = favorites
  }

  return (
    <StyledFavoritBlock>
      <img src={image} alt="" />
      <span>{colorOn ? "В избранном" : "Добавить в избранное"}</span>
    </StyledFavoritBlock>
  );
};

export default Favorites

Favorites.propTypes = {
  colorOn: PropTypes.bool,
  colorOff: PropTypes.bool,
};

Favorites.defaultProps = {
  colorOn: false,
  colorOff: false,
};