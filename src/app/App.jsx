import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useAuth } from '../common/context/Auth/useAuth';
import { Header } from '../components/layout/header/Header';
import { fetchProfile } from '../features/profile/profileSlice';
import { LazyPlaceholder } from './LazyPlaceholder';
import { Footer } from '../components/layout/Footer';

const QuestionPage = lazy(() => import('../features/questions/question-page/QuestionPage'));
const CreateQuestion = lazy(() =>
  import('../features/questions/create-question/CreateQuestionPage')
);
const QuestionsList = lazy(() => import('../features/questions/questions-list/QuestionsList'));

const ProfileUser = lazy(() => import('../features/profile/ProfileUser'));

const routes = [
  {
    key: 10,
    component: QuestionsList,
    path: '/',
    exact: true,
  },
  {
    key: 20,
    component: CreateQuestion,
    path: '/create',
  },
  {
    key: 30,
    component: QuestionPage,
    path: '/question/:id',
  },
  {
    key: 40,
    component: ProfileUser,
    path: '/profile',
  },
];

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
          {routes.map((route) => (
            <Route key={route.key} {...route} />
          ))}
        </Switch>
      </Suspense>
      <Footer />
    </>
  );
};
