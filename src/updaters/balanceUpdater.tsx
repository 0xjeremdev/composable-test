import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
// eslint-disable-next-line camelcase
import { Dai_Address } from 'config';
import { useAppDispatch } from 'state';
import { setDAIBalance, setDaiPrice, setETHBalance, setETHPrice } from 'state/balances';
import { ERC20Wrapper, getETHBalance } from 'utils/erc20';
import { ethers } from 'ethers';
import { getTokenPrice, TokenType } from 'utils';

const BalanceUpdater = () => {
  const dispatch = useAppDispatch();
  const { account, chainId, library } = useWeb3React<ethers.providers.Web3Provider>();

  useEffect(() => {
    const fetchPrice = async () => {
      const ethPrice = await getTokenPrice(TokenType.eth);
      dispatch(setETHPrice(ethPrice));
      const daiPrice = await getTokenPrice(TokenType.dai);
      dispatch(setDaiPrice(daiPrice));
    };
    const fetchBalance = async () => {
      const erc20Wrapper = new ERC20Wrapper(Dai_Address, library, 18, library?.getSigner());
      const daiBalance = await erc20Wrapper.balanceOf(account || '');
      dispatch(setDAIBalance(daiBalance));
      const ethBalance = await getETHBalance(account || '');
      dispatch(setETHBalance(ethBalance));
    };

    if (account) {
      fetchBalance();
      fetchPrice();
    }
  }, [account, chainId]);

  return null;
};

export default BalanceUpdater;
