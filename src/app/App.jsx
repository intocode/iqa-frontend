import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../common/context/Auth/useAuth';
import { Header } from '../components/Layout/Header';
import { fetchProfile } from '../features/profile/profileSlice';
import CreateQuestion from '../features/questions/CreateQuestion';
import { QuestionsList } from '../features/questions/QuestionsList';
import QuestionPage from '../features/questions/QuestionPage';
import { FavoriteList } from '../features/profile/FavoriteList';

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
          <CreateQuestion />
        </Route>
        <Route path="/question/:id">
          <QuestionPage />
        </Route>
        <Route path="/favorites">
          <FavoriteList />
        </Route>
      </Switch>
    </>
  );
};
