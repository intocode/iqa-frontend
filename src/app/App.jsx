import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from '../common/context/Auth/useAuth';
import { Header } from '../components/Layout/Header';
import { fetchProfile } from '../features/profile/profileSlice';
import CreateQuestion from '../features/questions/CreateQuestion';
import { QuestionsList } from '../features/questions/QuestionsList';
import QuestionPage from '../features/questions/QuestionPage';


export const App = () => {
  const { token } = useAuth();

  const dispatch = useDispatch();

  if (token) {
    dispatch(fetchProfile());
  }

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <QuestionsList />
        </Route>
        <Route path="/create" exact>
          <CreateQuestion />
        </Route>
        <Route path="/page/:id" exact>
          <QuestionPage />
        </Route>
      </Switch>
    </>
  );
};
