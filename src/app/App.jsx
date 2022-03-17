import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useAuth } from '../common/context/Auth/useAuth';
import { Header } from '../components/Layout/Header';
import { fetchProfile } from '../features/profile/profileSlice';
import { LazyPlaceholder } from './LazyPlaceholder';
import { ScrollToTop } from '../components/Layout/ScrollToTop';
import { Footer } from '../components/Layout/Footer';

const CreateQuestion = lazy(() =>
  import('../features/questions/CreateQuestion')
);
const QuestionPage = lazy(() => import('../features/questions/QuestionPage'));
const QuestionsList = lazy(() => import('../features/questions/QuestionsList'));
const FavoriteList = lazy(() => import('../features/profile/FavoriteList'));
const DeletedQuestionsCart = lazy(() =>
  import('../features/questions/DeletedQuestionsCart')
);

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
      <Suspense fallback={<LazyPlaceholder />}>
        <Switch>
          <Route path="/" exact>
            <QuestionsList />
            <ScrollToTop />
          </Route>
          <Route path="/create">
            <CreateQuestion />
          </Route>
          <Route path="/question/:id">
            <QuestionPage />
          </Route>
          <Route path="/favorites">
            <FavoriteList />
            <ScrollToTop />
          </Route>
          <Route path="/cart">
            <DeletedQuestionsCart />
            <ScrollToTop />
          </Route>
        </Switch>
      </Suspense>
      <Footer />
    </>
  );
};
