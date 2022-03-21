import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'state';
import { BalanceState } from '../types';

const initialState: BalanceState = { ethBalance: '', daiBalance: '', ethPrice: 0, daiPrice: 0 };

export const balanceSlice = createSlice({
  name: 'Balances',
  initialState,
  reducers: {
    setETHBalance: (state, action: PayloadAction<string>) => {
      state.ethBalance = action.payload;
    },
    setDAIBalance: (state, action: PayloadAction<string>) => {
      state.daiBalance = action.payload;
    },
    setETHPrice: (state, action: PayloadAction<number>) => {
      state.ethPrice = action.payload;
    },
    setDaiPrice: (state, action: PayloadAction<number>) => {
      state.daiPrice = action.payload;
    }
  }
});

// Actions
export const { setETHBalance, setDAIBalance, setETHPrice, setDaiPrice } = balanceSlice.actions;

export const getETHBalances = (state: AppState) => state.balances.ethBalance;
export const getDAIBalances = (state: AppState) => state.balances.daiBalance;
export const getETHPrice = (state: AppState) => state.balances.ethPrice;
export const getDAIPrice = (state: AppState) => state.balances.daiPrice;

export default balanceSlice.reducer;
