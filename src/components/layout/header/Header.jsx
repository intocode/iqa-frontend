import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider } from 'antd';
import { useAuth } from '../../../common/context/Auth/useAuth';
import { Logo } from './Logo';
import AdaptiveMenu from './AdaptiveMenu';
import MenuIcon from '../../icons/MenuIcon';
import CloseMenuIcon from '../../icons/CloseMenuIcon';
import { resetProfile, selectProfile } from '../../../features/profile/profileSlice';
import Popover from '../../ui/Popover';
import { Paper, Typography } from '../../ui';
import { LinkToFavorites } from './header-menu/LinkToFavorites';
import { LinkToDeleted } from './header-menu/LinkToDeleted';
import Search from './Search';
import ArrowAvatar from '../../icons/ArrowAvatar';
import LinkToProfilePage from './header-menu/LinkToProfilePage';
import HelpIcon from '../../icons/HelpIcon';

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
  }
  .upArrow {
    transform: rotate(0deg);
  }
`;

const StyledMenuProfile = styled.div`
  line-height: 1.7;
  margin: 10px 0;
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
  .fullName {
    font-size: 16px;
    color: black;
    padding-bottom: 5px;
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
  const iconMenuAndClose = !mobileMenu ? <MenuIcon /> : <CloseMenuIcon />;

  const { REACT_APP_FEATURE_ADD_QUESTION } = process.env;
  return (
    <StyledHeader>
      <AdaptiveMenu toggleMobileMenu={handleToggleMenu} mobileMenu={mobileMenu} />
      <div className="container">
        <div className="row align-items-center">
          <div className="col d-flex align-items-center">
            <div className="menu-icon d-md-none" onClick={handleToggleMenu} role="presentation">
              {iconMenuAndClose}
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
                    <Button type="primary">Добавить вопрос</Button>
                  </Link>
                )}
                <div className="px-3">
                  <Link to="/help">
                    <div className="d-flex align-items-center">
                      <HelpIcon />
                    </div>
                  </Link>
                </div>
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
                          <div className="fullName">{profile.fullName}</div>
                          <div>@{profile.name}</div>
                          <div role="presentation" onClick={handleOpenMenuProfile}>
                            <StyledMenuProfile>
                              <Divider className="m-0" />
                              <StyledMenuList>
                                <li className="mt-2">
                                  <LinkToProfilePage />
                                </li>
                                <li>
                                  <LinkToFavorites />
                                </li>
                                <li className="mb-2">
                                  <LinkToDeleted />
                                </li>
                              </StyledMenuList>
                              <Divider className="m-0" />
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
                <Button onClick={executeLoggingInProcess} color="primary">
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
