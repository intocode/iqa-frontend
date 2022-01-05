import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../common/context/Auth/useAuth';
import { Button } from '../ui/Button';
import { Typography } from '../ui/Typography';
import { Logo } from './Logo';
import { fetchQuestions } from '../../features/questions/questionsSlice';

const StyledHeader = styled.div`
  background-color: white;
  .header_link {
    text-decoration: none;
  }
`;

export const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token, executeLoggingInProcess, logout } = useAuth();

  const handleAddQuestion = () => history.push('/create');

  const handleToMain = () => {
    dispatch(fetchQuestions());
  };

  return (
    <StyledHeader>
      <div className="container mb-2 py-2">
        <div className="row align-items-center">
          <div className="col d-flex align-items-center">
            <div className="me-3">
              <Link to="/" onClick={handleToMain}>
                <Logo />
              </Link>
            </div>
            <Link to="/" className="header_link">
              <Typography>Главная</Typography>
            </Link>
            {/* <Link to="/favorites" className="header_link">
              <Badge content={5}>
                <Typography>Избранные</Typography>
              </Badge>
            </Link> */}
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
