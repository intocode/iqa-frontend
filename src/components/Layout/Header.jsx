import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../common/context/Auth/useAuth';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Typography } from '../ui/Typography';
import { Logo } from './Logo';

export const Header = () => {
  const { token, executeLoggingInProcess, logout } = useAuth();
  const StyledHeader = styled.div`
    background-color: white;
    .header_link {
      text-decoration: none;
    }
  `;
  const handleAddQuestion = () => {};
  return (
    <StyledHeader>
      <div className="container mb-2 py-2">
        <div className="row align-items-center">
          <div className="col d-flex align-items-center">
            <div className="me-3">
              <Logo />
            </div>
            <Typography>Главная</Typography>
            <Badge content={5}>
              <Typography>Избранные</Typography>
            </Badge>
          </div>
          <div className="col-auto">
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
              <Link to="/" className="header_link">
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
