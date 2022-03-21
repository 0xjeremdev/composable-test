import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import getRpcUrl from './getRpcUrl';
export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'WalletConnect'
}

export interface ConnectorData {
  connector: any;
  name: string;
}

const injected = new InjectedConnector({
  supportedChainIds: [3]
});

const walletConnect = new WalletConnectConnector({
  rpc: { 3: getRpcUrl() }
});

export const connectors: { [name in ConnectorNames]: ConnectorData } = {
  [ConnectorNames.Injected]: { connector: injected, name: 'Metamask' },
  [ConnectorNames.WalletConnect]: { connector: walletConnect, name: 'WalletConnect' }
};
