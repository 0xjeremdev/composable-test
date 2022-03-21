import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { CssBaseline } from '@mui/material';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from 'utils/web3React';
import BalanceUpdater from 'updaters/balanceUpdater';
import { Provider } from 'react-redux';
import store from 'state';

const MyApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>DeFi App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BalanceUpdater />
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Web3ReactProvider>
    </>
  );
};

export default MyApp;
