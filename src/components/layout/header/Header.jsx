import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../common/context/Auth/useAuth';
import { Button } from '../../ui/Button';
import { Logo } from './Logo';
import AdaptiveMenu from './AdaptiveMenu';
import iconMenu from '../../assets/menu.svg';
import iconCloseMenu from '../../assets/closeMenu.svg';
import { resetProfile, selectProfile } from '../../../features/profile/profileSlice';
import Popover from '../../ui/Popover';
import { Divider, Paper, Typography } from '../../ui';
import { LinkToFavorites } from './header-menu/LinkToFavorites';
import { LinkToDeleted } from './header-menu/LinkToDeleted';
import Search from './Search';
import ArrowAvatar from '../../icons/ArrowAvatar';
import LinkToPageUser from './header-menu/LinkToPageUser';

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

const StyledAvatar = styled.div`
  display: flex;
  align-items: center;

  & > img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
  }

  .downArrow,
  .upArrow {
    color: ${({ theme }) => theme.colors.gray.main};
    cursor: pointer;
    margin-left: 5px;
    transform: rotate(180deg);
    transition: 0.3s;
  }
  .upArrow {
    transform: rotate(0deg);
  }
`;

const StyledMenuProfile = styled.div`
  line-height: 1.7;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledMenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledWrapperPaper = styled.div`
  margin-top: 5px;
  & > div {
    font-size: 14px;
    color: #909399;
  }
`;

export const Header = () => {
  // todo: рефакторить мобильную версию. Возможно нужен вынос в хук или в контекст

  const { token, executeLoggingInProcess, logout } = useAuth();

  const [mobileMenu, setMobileMenu] = useState(false);

  const [openMenuProfile, setOpenMenuProfile] = useState(false);

  const ref = useRef();

  const dispatch = useDispatch();

  // todo: зачем это нужно?
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const profile = useSelector(selectProfile);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
  const handleOpenMenuProfile = () => {
    setOpenMenuProfile(!openMenuProfile);
  };

  const handleClick = () => {
    dispatch(resetProfile());
    logout();
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

            <Search />
          </div>
          <div className="col-auto d-none d-md-flex align-items-center">
            {token ? (
              <>
                {REACT_APP_FEATURE_ADD_QUESTION && (
                  <Link to="/create" className="header_link">
                    <Button className="me-3" contrast={false} color="primary">
                      Добавить вопрос
                    </Button>
                  </Link>
                )}
                <div>
                  <StyledAvatar onClick={handleOpenMenuProfile} ref={ref} className="d-md-flex">
                    <img className="m-auto" src={profile.avatar?.thumbnail} alt="" />
                    <div className={openMenuProfile ? 'downArrow' : 'upArrow'}>
                      <ArrowAvatar />
                    </div>
                  </StyledAvatar>
                  {openMenuProfile && (
                    <Popover
                      open={openMenuProfile}
                      onClose={setOpenMenuProfile}
                      anchorEl={ref}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    >
                      <StyledWrapperPaper>
                        <Paper className="d-flex flex-column">
                          <div>@{profile.name}</div>
                          <div role="presentation" onClick={handleOpenMenuProfile}>
                            <StyledMenuProfile>
                              <Divider />
                              <StyledMenuList>
                                <li className="mt-2">
                                  <LinkToPageUser />
                                </li>
                                <li>
                                  <LinkToFavorites />
                                </li>
                                <li className="mb-2">
                                  <LinkToDeleted />
                                </li>
                              </StyledMenuList>
                              <Divider />
                            </StyledMenuProfile>
                            <Link to="/" className="d-none d-md-block">
                              <Typography onClick={handleClick}>Выйти</Typography>
                            </Link>
                          </div>
                        </Paper>
                      </StyledWrapperPaper>
                    </Popover>
                  )}
                </div>
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
