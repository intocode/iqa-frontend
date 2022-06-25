import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../common/context/Auth/useAuth';
import { Button } from '../../ui/Button';
import { Logo } from './Logo';
import AdaptiveMenu from './AdaptiveMenu';
import iconMenu from '../../assets/menu.svg';
import iconCloseMenu from '../../assets/closeMenu.svg';
import AnimatedSearch from './AnimatedSearch';
import { HeaderMenu } from './header-menu/HeaderMenu';

const StyledHeader = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: white;
  min-height: 80px;
  display: flex;
  align-items: center;

  .header_link {
    text-decoration: none;
  }

  .menu-icon {
    position: absolute;
  }

  @media ${({ theme }) => theme.media.phone} {
    .container {
      padding: 24px 20px;
    }
  }
`;

export const Header = () => {
  // todo: рефакторить мобильную версию. Возможно нужен вынос в хук или в контекст

  const { token, executeLoggingInProcess, logout } = useAuth();

  const [mobileMenu, setMobileMenu] = useState(false);

  // todo: зачем это нужно?
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleMenu = () => {
    if (!mobileMenu) {
      setMobileMenu(!mobileMenu);
      document.body.style.overflowY = 'clip';
    } else {
      setMobileMenu(!mobileMenu);
      document.body.style.overflowY = 'visible';
    }
  };

  // todo: рефакторить
  const iconMenuAndClose = !mobileMenu ? iconMenu : iconCloseMenu;

  const { REACT_APP_FEATURE_ADD_QUESTION } = process.env;

  return (
    <StyledHeader>
      <AdaptiveMenu toggleMobileMenu={handleToggleMenu} mobileMenu={mobileMenu} />
      <div className="container">
        <div className="row align-items-center">
          <div className="col d-flex align-items-center">
            <div className="menu-icon d-md-none" onClick={handleToggleMenu} role="presentation">
              <img src={iconMenuAndClose} width={32} alt="iqa logotype" />
            </div>
            <div className="offset-5 offset-md-0">
              <Link to="/">
                <Logo long={windowWidth < 768} />
              </Link>
            </div>

            <HeaderMenu />

            <AnimatedSearch />
          </div>
          <div className="col-auto d-none d-md-block">
            {token ? (
              <>
                {REACT_APP_FEATURE_ADD_QUESTION && (
                  <Link to="/create" className="header_link">
                    <Button className="me-3" contrast={false} color="primary">
                      Добавить вопрос
                    </Button>
                  </Link>
                )}
                <Link to="/" className="header_link">
                  <Button contrast={false} color="primary" onClick={logout}>
                    Выйти
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/" className="header_link d-none d-md-block">
                <Button contrast={false} color="primary" onClick={executeLoggingInProcess}>
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
