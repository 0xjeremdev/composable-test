import { RopstenID } from 'config';
import { Contract, ethers } from 'ethers';
import erc20Abi from './erc20.json';
import getRpcUrl from './getRpcUrl';

export const getProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider(getRpcUrl(), RopstenID);
  return provider;
};

export const getETHBalance = async (holderAddress: string): Promise<string> => {
  const provider = new ethers.providers.JsonRpcProvider(getRpcUrl(), RopstenID);
  const balance = await provider.getBalance(holderAddress);

  return balance.toString();
};

export class ERC20Wrapper {
  contract: Contract;
  decimal: number;
  signer: ethers.Signer;

  constructor(address: string, provider: any, decimal: number, signer?: ethers.Signer) {
    const contract = new ethers.Contract(address, erc20Abi, provider);
    this.contract = signer ? contract.connect(signer) : contract;
    this.decimal = decimal;
    this.signer = signer;
  }

  balanceOf = async (holder: string): Promise<string> => {
    return (await this.contract.balanceOf(holder)).toString();
  };

  transfer = async (receiver: string, amount: string): Promise<ethers.providers.TransactionResponse> => {
    const tx: ethers.providers.TransactionResponse = await this.contract.transfer(receiver, amount);
    return tx;
  };
}
