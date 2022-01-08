import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../common/context/Auth/useAuth';
import { Button } from '../ui/Button';
import { Typography } from '../ui/Typography';
import { Logo } from './Logo';
import logoMenuAdaptive from '../assets/menu.svg'

const StyledHeader = styled.div`
  background-color: white;
  .header_link {
    text-decoration: none;
  }
  .adaptive_menu {
    position: relative;
  }
  .logo_menu {
    position: absolute;
    top: -8px;
  }
  .menu_mobile {
    position: absolute;
    width: 75%;
    height: 1000px;
    top: 43px;
    background-color: #f8f9fa;
  }
`;

export const Header = () => {
  const [menu, setMenu] = useState(false);
  const history = useHistory();
  const { token, executeLoggingInProcess, logout } = useAuth();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const handleAddQuestion = () => history.push('/create');

  const handleToggleMenu = () => setMenu(!menu);

  return (
    <StyledHeader>
      {menu &&
      <div className='adaptive_menu d-md-none'>
        <div className='menu_mobile'>
          <div className="col-auto pt-3">
            {token ? (
              <>
                <Button
                  className="me-3"
                  contrast={false}
                  color="primary"
                  onClick={handleAddQuestion}
                >
                  Добавить вопрос
                </Button>
                <Link to="/" className="header_link">
                  <Button contrast={false} color="primary" onClick={logout}>
                    Выйти
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/" className="header_link offset-3">
                <Button
                  contrast={false}
                  color="primary"
                  onClick={executeLoggingInProcess}
                >
                  Login with GitHub
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>}
      <div className="container mb-2 py-2">
        <div className="row align-items-center">
          <div className="col d-flex align-items-center">
            <div className='adaptive_menu'>
              <div className='logo_menu d-md-none' onClick={handleToggleMenu} role="presentation">
                <span>
                  <img src={logoMenuAdaptive} alt="" />
                </span>
              </div>
            </div>
            <div className="me-3 offset-6 offset-md-0">
              <Link to="/">
                <Logo long={windowWidth < 768} />
              </Link>
            </div>
            <Link to="/" className="header_link d-none d-md-block ">
              <Typography>Главная</Typography>
            </Link>
            {/* <Link to="/favorites" className="header_link">
              <Badge content={5}>
                <Typography>Избранные</Typography>
              </Badge>
            </Link> */}
          </div>
          <div className="col-auto d-none d-md-block">
            {token ? (
              <>
                <Button
                  className="me-3"
                  contrast={false}
                  color="primary"
                  onClick={handleAddQuestion}
                >
                  Добавить вопрос
                </Button>
                <Link to="/" className="header_link">
                  <Button contrast={false} color="primary" onClick={logout}>
                    Выйти
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/" className="header_link d-none d-md-block">
                <Button
                  contrast={false}
                  color="primary"
                  onClick={executeLoggingInProcess}
                >
                  Login with GitHub
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};
