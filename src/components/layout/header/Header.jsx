import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button, Popover } from 'antd';
import { selectProfile } from 'features/profile/profileSlice';
import { useAuth } from 'common/context/Auth/useAuth';
import ArrowAvatar from 'components/icons/ArrowAvatar';
import CloseMenuIcon from 'components/icons/CloseMenuIcon';
import MenuIcon from 'components/icons/MenuIcon';
import HelpIcon from 'components/icons/HelpIcon';
import AdaptiveMenu from './AdaptiveMenu';
import Search from './Search';
import { Logo } from './Logo';
import PopoverContent from './PopoverContent';

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

export const Header = () => {
  // todo: рефакторить мобильную версию. Возможно нужен вынос в хук или в контекст

  const { token, executeLoggingInProcess } = useAuth();

  const [mobileMenu, setMobileMenu] = useState(false);

  const [openMenuProfile, setOpenMenuProfile] = useState(false);

  const ref = useRef();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuProfile && !event.path.includes(ref.current)) {
        setOpenMenuProfile(!openMenuProfile);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [setOpenMenuProfile, openMenuProfile]);

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
            {token && (
              <div>
                {REACT_APP_FEATURE_ADD_QUESTION && (
                  <Link to="/create" className="header_link">
                    <Button type="primary">Добавить вопрос</Button>
                  </Link>
                )}
              </div>
            )}
            <div className="px-3">
              <Link to="/help">
                <div className="d-flex align-items-center">
                  <HelpIcon />
                </div>
              </Link>
            </div>
            {token ? (
              <div>
                <Popover placement="bottomRight" trigger="click" content={PopoverContent}>
                  <StyledAvatar onClick={handleOpenMenuProfile} ref={ref} className="d-md-flex">
                    <img className="m-auto" src={profile.avatar?.thumbnail} alt="" />
                    <div className={openMenuProfile ? 'downArrow' : 'upArrow'}>
                      <ArrowAvatar />
                    </div>
                  </StyledAvatar>
                </Popover>
              </div>
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
