import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from 'antd';
import LogoNoColorIcon from 'components/icons/LogoNoColorIcon';

const StyledFooter = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;

  .footer_text {
    font-size: 14px;
    color: #828282;
  }

  .footer_link {
    color: #4f4f4f;
    font-size: 16px;
  }
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="d-none d-sm-block">
              <Link to="/">
                <LogoNoColorIcon />
              </Link>
            </div>
            <div className="ms-3 footer_text">
              Interview Questions And Answers Application <br />
              Intocode, 2016-2022
            </div>
          </div>
          <div className="d-flex d-none d-sm-flex">
            <Link to="/" className="me-3">
              <Typography className="footer_link">О нас</Typography>
            </Link>
            <a target="blank" href="https://github.com/intocode/iqa-frontend">
              <Typography className="footer_link">GitHub</Typography>
            </a>
          </div>
        </div>
      </div>
    </StyledFooter>
  );
};
