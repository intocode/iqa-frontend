import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfile } from '../features/profile/profileSlice';
import { useAuth } from '../common/context/Auth/useAuth';
import { Button } from '../components/Button';
import { ReactComponent as GitHubIcon } from '../assets/github-com-icon.svg';
import { Alert } from '../components/Alert';
import QuestionAddForm from '../features/questions/QuestionAddForm';

function App() {
  const dispatch = useDispatch();

  const { executeLoggingInProcess, token, logout } = useAuth();

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token]);

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
      {token && (
        <>
          <Alert>Hello</Alert>
          <Button
            color="primary"
            onClick={async () => {
              await axios.get('http://localhost:3030/auth/check');

              // eslint-disable-next-line no-console
              console.log(axios.defaults);
            }}
          >
            make request
          </Button>
        </>
      )}
      <QuestionAddForm />
    </div>
  );
}

export default App;
