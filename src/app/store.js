import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import profile from '../features/profile/profileSlice';
import questions from '../features/questions/questionsSlice';
import comments from '../features/comments/commentsSlice';
import application from '../features/application/applicationSlice';
import questionsSearch from '../features/search/searchQuestionSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, application);

export const store = configureStore({
  reducer: {
    questionsSearch,
    profile,
    questions,
    comments,
    application: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
