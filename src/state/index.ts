import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import balancesReducer from './balances';

const store = configureStore({
  reducer: {
    balances: balancesReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
