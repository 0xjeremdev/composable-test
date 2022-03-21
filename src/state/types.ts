import { BigNumber } from 'bignumber.js';

export interface BalanceState {
  ethBalance: string;
  daiBalance: string;
  ethPrice: number;
  daiPrice: number;
}

export interface State {
  balances: BalanceState;
}
