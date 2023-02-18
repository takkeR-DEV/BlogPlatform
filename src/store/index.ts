import { configureStore, combineReducers } from '@reduxjs/toolkit';
import articlesReducer from './reducers/articesReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  articlesReducer,
  authReducer,
});

// export const store = configureStore({ reducer: rootReducer });

// export const store = configureStore({ reducer: rootReducer });

export const setupStore = () => configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
