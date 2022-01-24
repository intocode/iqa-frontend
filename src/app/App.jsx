import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../common/context/Auth/useAuth';
import { Header } from '../components/Layout/Header';
import { fetchProfile } from '../features/profile/profileSlice';
import CreateQuestion from '../features/questions/CreateQuestion';
import { QuestionsList } from '../features/questions/QuestionsList';
import QuestionPage from '../features/questions/QuestionPage';

export const App = () => {
  const { token } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token]);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <QuestionsList />
        </Route>
        <Route path="/create">
          {token ? <CreateQuestion /> : <Redirect to="/" />}
        </Route>
        <Route path="/question/:id">
          <QuestionPage />
        </Route>
      </Switch>
    </>
  );
};
