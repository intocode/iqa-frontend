import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoNoColorIcon from '../icons/LogoNoColorIcon';
import { Typography } from '../ui';

const StyledFooter = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 20px;
  min-height: 260px;

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
            <div>
              <Link to="/">
                <LogoNoColorIcon />
              </Link>
            </div>
            <div className="ms-3 footer_text">
              Interview Questions And Answers Application <br />© Intocode,
              2016-2022
            </div>
          </div>
          <div className="d-flex">
            <Link to="/" className="me-3">
              <Typography className="footer_link">О нас</Typography>
            </Link>
            <Link target="_blank" to="https://github.com/intocode">
              <Typography className="footer_link">GitHub</Typography>
            </Link>
          </div>
        </div>
      </div>
    </StyledFooter>
  );
};
