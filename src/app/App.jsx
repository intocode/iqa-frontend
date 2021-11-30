import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuestions } from '../features/questions/questionsSlice';
import { Header } from '../components/Layout/Header';
import CreateQuestion from '../features/questions/CreateQuestion';
import { QuestionsList } from '../features/questions/QuestionsList';
import QuestionPage from '../features/questions/QuestionPage';


export const App = () => {
  const dispatch = useDispatch()
  useEffect(() => dispatch(fetchQuestions()), [dispatch]);
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
