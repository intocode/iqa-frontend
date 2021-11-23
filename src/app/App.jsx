import { Route, Switch } from 'react-router-dom';
import { Header } from '../components/Layout/Header';
import CreateQuestion from '../features/questions/CreateQuestion';
import { QuestionsList } from '../features/questions/QuestionsList';

export const App = () => {
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
      </Switch>
    </>
  );
};
