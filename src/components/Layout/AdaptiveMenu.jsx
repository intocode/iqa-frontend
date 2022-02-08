import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useAuth } from '../../common/context/Auth/useAuth';
import { Button, Typography } from '../ui';

const StyledMenu = styled.div`
  .adaptive_menu {
    position: relative;
    z-index: 1;
  }
  .menu_mobile {
    position: absolute;
    width: 75%;
    height: 1000px;
    top: 43px;
    background-color: #f8f9fa;
    box-shadow: 200px -4px 0px -5px rgba(0, 0, 0, 0.31);
  }
`;

const AdaptiveMenu = ({ toggleMobileMenu, mobileMenu }) => {
  const location = useLocation();
  const history = useHistory();
  const { token, executeLoggingInProcess, logout } = useAuth();

  const handleAddQuestion = () => {
    history.push('/create');
  };
  const handleFavorites = () => {
    history.push('/favorites');
  };

  useEffect(() => {
    if (mobileMenu) {
      toggleMobileMenu();
    }
  }, [location.key]); //eslint-disable-line

  return (
    <StyledMenu>
      {mobileMenu && (
        <div className="adaptive_menu d-md-none">
          <div className="menu_mobile">
            <div className="pt-3 px-5 ">
              {token ? (
                <>
                  <Button
                    className="d-block mb-2 m-auto"
                    contrast={false}
                    color="primary"
                    onClick={handleAddQuestion}
                  >
                    Добавить вопрос
                  </Button>
                  <Button
                    className="d-block mb-2 m-auto"
                    contrast={false}
                    color="primary"
                    onClick={handleFavorites}
                  >
                    <Typography>Избранные</Typography>
                  </Button>
                  <Link to="/" className="header_link">
                    <Button
                      className="d-block m-auto"
                      contrast={false}
                      color="primary"
                      onClick={logout}
                    >
                      Выйти
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/" className="header_link">
                  <Button
                    className="d-block m-auto"
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
      )}
    </StyledMenu>
  );
};

AdaptiveMenu.propTypes = {
  toggleMobileMenu: PropTypes.func.isRequired,
  mobileMenu: PropTypes.bool.isRequired,
};

export default AdaptiveMenu;
