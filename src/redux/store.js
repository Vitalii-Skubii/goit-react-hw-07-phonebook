import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { contactsReducer } from './contacts';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// const myMiddleware = store => next => action => {
//   console.log('My middleware');
// };
// function myMiddleware(store) {
//   return function (next) {
//     return function (action) {
//       func_bodY
//     };
//   };
// }

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  // myMiddleware,
  logger,
];

export const store = configureStore({
  reducer: { contacts: contactsReducer },

  middleware,
  devTools: process.env.NODE_ENV === 'development',
});
// export const persistor = persistStore(store);
