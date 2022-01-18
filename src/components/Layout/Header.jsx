import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../common/context/Auth/useAuth';
import { Button } from '../ui/Button';
import { Typography } from '../ui/Typography';
import { Logo } from './Logo';
import {
  fetchQuestions,
  selectQuestionsLoading,
} from '../../features/questions/questionsSlice';
import AdaptiveMenu from './AdaptiveMenu';
import iconMenu from '../assets/menu.svg';
import iconCloseMenu from '../assets/closeMenu.svg';

const StyledHeader = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: white;
  .header_link {
    text-decoration: none;
  }
  .adaptive_menu {
    position: relative;
  }
  .icon_menu {
    position: absolute;
    top: -8px;
  }
  .container {
    padding: 15px;
  }
`;

export const Header = () => {
  const [menu, setMenu] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { token, executeLoggingInProcess, logout } = useAuth();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const loading = useSelector(selectQuestionsLoading);

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
    setMenu(!menu);
    if (!menu) {
      document.body.style.overflowY = 'clip';
    } else {
      document.body.style.overflowY = 'visible';
    }
  };

  const iconMenuAndClose = !menu ? iconMenu : iconCloseMenu;

  return (
    <StyledHeader>
      <AdaptiveMenu menu={menu} />
      <div className="container mb-2 py-2">
        <div className="row align-items-center">
          <div className="col d-flex align-items-center">
            <div className="adaptive_menu">
              <div
                className="icon_menu d-md-none"
                onClick={handleToggleMenu}
                role="presentation"
              >
                <span>
                  <img src={iconMenuAndClose} alt="" />
                </span>
              </div>
            </div>
            <div className="me-3 offset-5 offset-md-0">
              <Link to="/" onClick={handleToMain}>
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
          {loading ? (
            ''
          ) : (
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
          )}
        </div>
      </div>
    </StyledHeader>
  );
};
