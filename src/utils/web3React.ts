import { ethers } from 'ethers';

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider, 'any');
  return library;
};
