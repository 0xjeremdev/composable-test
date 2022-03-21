import React from 'react';
import {
  styled,
  Container,
  AppBar as MaterialAppBar,
  Toolbar as MuiToolbar,
  Typography,
  Button,
  Box
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import WalletModal from 'components/WalletModal';
import { useSelector } from 'react-redux';
import { getETHBalances, getETHPrice } from 'state/balances';
import { rawToFixed } from 'utils';
import BigNumber from 'bignumber.js';

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  background: 'transparent',
  padding: theme.spacing(2)
}));

const Header: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const { account } = useWeb3React();
  const ethBalance = useSelector(getETHBalances);
  const ethPrice = useSelector(getETHPrice);
  return (
    <>
      <MaterialAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                DeFi App
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0, textAlign: 'right' }}>
              {account ? (
                <Box>
                  <Typography variant="body1">{`${account.substring(0, 6)}...${account.substring(
                    account.length - 4
                  )}`}</Typography>
                  {ethBalance !== '' && (
                    <Typography variant="body2">
                      {rawToFixed(ethBalance, 18).toFixed(2)} ETH ($
                      {rawToFixed(ethBalance, 18).multipliedBy(new BigNumber(ethPrice)).toFixed(2)})
                    </Typography>
                  )}
                </Box>
              ) : (
                <Button variant="text" onClick={() => setModalOpen(true)}>
                  Connect Wallet
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </MaterialAppBar>
      <WalletModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Header;
