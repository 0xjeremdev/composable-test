import BigNumber from 'bignumber.js';
import CoinGecko from 'coingecko-api';
import { getAddress } from 'ethers/lib/utils';

export enum TokenType {
  eth = 'ethereum',
  dai = 'dai'
}
export const getTokenPrice = async (token: TokenType): Promise<number> => {
  const CoinGeckoClient = new CoinGecko();
  const data = await CoinGeckoClient.coins.fetch(token, {});
  return data.data.market_data.current_price.usd;
};

export const rawToFixed = (amount: string, decimal: number): BigNumber => {
  return new BigNumber(amount).div(new BigNumber(10).pow(decimal));
};

export const fixedToRaw = (amount: string, decimal: number): BigNumber => {
  return new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimal));
};

export const isAddress = (address: string) => {
  try {
    getAddress(address);
  } catch (e) {
    return false;
  }
  return true;
};
