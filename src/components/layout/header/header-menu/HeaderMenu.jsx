import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '../../../ui';

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-left: 2rem;
    padding: 0;
    display: inline-block;
  }
`;

export const HeaderMenu = () => {
  return (
    <div>
      <StyledUl>
        <li>
          <Link to="/" className="d-none d-md-block">
            <Typography>Главная</Typography>
          </Link>
        </li>
      </StyledUl>
    </div>
  );
};
