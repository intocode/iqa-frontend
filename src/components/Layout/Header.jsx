import { useAuth } from '../../common/context/Auth/useAuth';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Typography } from '../ui/Typography';
import { Logo } from './Logo';

export const Header = () => {
  const { token, executeLoggingInProcess, logout } = useAuth();
  return (
    <div style={{ backgroundColor: 'white' }}>
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
                  onClick={logout}
                >
                  Добавить вопрос
                </Button>
                <Button contrast={false} color="primary" onClick={logout}>
                  Выйти
                </Button>
              </>
            ) : (
              <Button
                contrast={false}
                color="primary"
                onClick={executeLoggingInProcess}
              >
                Login with GitHub
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
