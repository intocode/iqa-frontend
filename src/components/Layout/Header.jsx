import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
import { useAuth } from '../../common/context/Auth/useAuth';
import { Button } from '../ui/Button';
import { Typography } from '../ui/Typography';
import { Logo } from './Logo';
import { fetchQuestions } from '../../features/questions/questionsSlice';
import { selectProfileLoading } from '../../features/profile/profileSlice';
import AdaptiveMenu from './AdaptiveMenu';
import iconMenu from '../assets/menu.svg';
import iconCloseMenu from '../assets/closeMenu.svg';
import { Badge } from '../ui';

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

  @media ${(props) => props.theme.media.phone} {
    .container {
      padding: 24px 20px;
    }
  }
`;

export const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token, executeLoggingInProcess, logout } = useAuth();
  const [mobileMenu, setMobileMenu] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const loading = useSelector(selectProfileLoading);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddQuestion = () => history.push('/create');

  const handleToMain = () => {
    dispatch(fetchQuestions());
  };

  const handleToggleMenu = () => {
    if (!mobileMenu) {
      setMobileMenu(!mobileMenu);
      document.body.style.overflowY = 'clip';
    } else {
      setMobileMenu(!mobileMenu);
      document.body.style.overflowY = 'visible';
    }
  };

  const iconMenuAndClose = !mobileMenu ? iconMenu : iconCloseMenu;

  return (
    <StyledHeader>
      <AdaptiveMenu
        toggleMobileMenu={handleToggleMenu}
        mobileMenu={mobileMenu}
      />
      <div className="container">
        <div className="row align-items-center">
          <div className="col d-flex align-items-center">
            <div
              className="menu-icon d-md-none"
              onClick={handleToggleMenu}
              role="presentation"
            >
              <span>
                <img src={iconMenuAndClose} width={32} alt="" />
              </span>
            </div>
            <div className="me-3 offset-5 offset-md-0">
              <Link to="/" onClick={handleToMain}>
                <Logo long={windowWidth < 768} />
              </Link>
            </div>
            <Link to="/" className="header_link d-none d-md-block ">
              <Typography>Главная</Typography>
            </Link>
            {token && (
              <Link to="/favorites" className="header_link d-none d-md-block">
                <Badge content={5}>
                  <Typography>Избранные</Typography>
                </Badge>
              </Link>
            )}
            <Search />
          </div>
          <div className="col-auto d-none d-md-block">
            {token && !loading && (
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
            )}
            {!token && (
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
