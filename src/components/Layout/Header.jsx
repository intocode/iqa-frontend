import { useAuth } from '../../common/context/Auth/useAuth';
import { Button } from '../ui/Button';

// черновой вариант хидера

export const Header = () => {
  const { token, executeLoggingInProcess, logout } = useAuth();
  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className="container mb-2 py-2">
        <div className="row align-items-center">
          <div className="col">iqa</div>
          <div className="col-auto">
            {token ? (
              <Button onClick={logout}>Выйти</Button>
            ) : (
              <Button onClick={executeLoggingInProcess}>
                Login with GitHub
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
