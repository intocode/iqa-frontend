import { useAuth } from '../common/context/Auth/useAuth';
import { Button } from '../components/Button';
import { ReactComponent as GitHubIcon } from '../assets/github-com-icon.svg';

function App() {
  const { executeLoggingInProcess, token, logout } = useAuth();

  return (
    <div className="container">
      <div className="row">
        <div className="col-auto">
          {token ? (
            <Button color="gray" onClick={logout}>
              Выйти
            </Button>
          ) : (
            <Button
              color="gray"
              startIcon={<GitHubIcon />}
              onClick={executeLoggingInProcess}
            >
              Sign In with GitHub
            </Button>
          )}
        </div>
      </div>
      <hr />
      <div className="alert alert-info" />
    </div>
  );
}

export default App;
