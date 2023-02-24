import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useAuth } from 'common/context/Auth/useAuth';
import { Header } from 'components/layout/header/Header';
import { fetchProfile } from 'features/profile/profileSlice';
import { Footer } from 'components/layout/Footer';
import PatchUserModal from 'components/PatchUserModal';
import { LazyPlaceholder } from './LazyPlaceholder';

const QuestionPage = lazy(() => import('features/questions/question-page/QuestionPage'));
const CreateQuestion = lazy(() => import('features/questions/create-question/CreateQuestionPage'));
const QuestionsList = lazy(() => import('features/questions/questions-list/QuestionsList'));

const ProfileUser = lazy(() => import('features/profile/ProfileUser'));
const HelpPage = lazy(() => import('pages/HelpPage'));

const routes = [
  {
    key: 10,
    element: <QuestionsList />,
    path: '/',
    exact: true,
  },
  {
    key: 20,
    element: <CreateQuestion />,
    path: '/create',
  },
  {
    key: 30,
    element: <QuestionPage />,
    path: '/question/:id',
  },
  {
    key: 40,
    element: <ProfileUser />,
    path: '/profile',
  },
  {
    key: 50,
    element: <HelpPage />,
    path: '/help',
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
      <PatchUserModal />
      <Header />
      <Suspense fallback={<LazyPlaceholder />}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.key} {...route} />
          ))}
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};
