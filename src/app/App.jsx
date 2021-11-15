import { Route, Switch } from 'react-router-dom';
import { Header } from '../components/Layout/Header';
import { QuestionsList } from '../features/questions/QuestionsList';

export const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/">
          <QuestionsList />
        </Route>
      </Switch>
    </>
  );
};
