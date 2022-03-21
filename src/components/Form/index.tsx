import React from 'react';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { getDAIBalances, setDAIBalance, setETHBalance, getETHBalances, getDAIPrice } from 'state/balances';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { fixedToRaw, isAddress, rawToFixed } from 'utils';
import { useAppDispatch } from 'state';
import BigNumber from 'bignumber.js';
import { ERC20Wrapper } from 'utils/erc20';
// eslint-disable-next-line camelcase
import { Dai_Address } from 'config';
import { ethers } from 'ethers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 200
    },
    form: {
      maxWidth: 500,
      margin: 'auto auto',
      textAlign: 'center'
    },
    button: {
      width: 300,
      maxWidth: '100%',
      display: 'block',
      margin: '20px auto'
    },
    inputContainer: {
      margin: '20px auto'
    },
    invalid: {
      border: '1px solid red'
    }
  })
);

const Form: React.FC = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { account, library } = useWeb3React<ethers.providers.Web3Provider>();
  const [amount, setAmount] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [pendingTx, setPendingTx] = React.useState('');
  const ethBalance = useSelector(getETHBalances);
  const daiBalance = useSelector(getDAIBalances);
  const daiPrice = useSelector(getDAIPrice);
  const daiAmount = new BigNumber(daiBalance);

  const sendAmount = fixedToRaw(amount, 18);
  const isInvalidAmount = sendAmount.isGreaterThan(daiAmount);
  const isInvalidAddress = !isAddress(address);
  const onSend = async () => {
    if (isInvalidAmount || isInvalidAddress) {
      return;
    }
    const erc20Wrapper = new ERC20Wrapper(Dai_Address, library, 18, library?.getSigner());

    const res = await erc20Wrapper.transfer(address, sendAmount.toString());
    setPendingTx(res.hash);
    res
      .wait()
      .then((r) => {
        if (r.status) {
          const newETHAmount = new BigNumber(ethBalance).minus(new BigNumber(r.gasUsed.toString()));
          dispatch(setETHBalance(newETHAmount.toString()));
          const newDAIAmount = daiAmount.minus(sendAmount);
          dispatch(setDAIBalance(newDAIAmount.toString()));
        }
        setPendingTx('');
        return r;
      })
      .catch((e) => {});
  };

  return (
    <Container maxWidth="xl" className={styles.root}>
      <Box className={styles.form}>
        <Box className={styles.inputContainer}>
          <TextField
            label="Enter DAI Amount"
            variant="filled"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className={isInvalidAmount ? styles.invalid : ''}
          />
          <Box sx={{ textAlign: 'left', pl: 2, mt: 1, color: 'text.secondary' }}>
            {account && daiBalance !== '' && (
              <Typography>
                Balance: {rawToFixed(daiBalance, 18).toFixed(2)} DAI ($
                {rawToFixed(daiBalance, 18).multipliedBy(new BigNumber(daiPrice)).toFixed(2)})
              </Typography>
            )}
          </Box>
        </Box>
        <Box className={styles.inputContainer}>
          <TextField
            label="Enter recipients address"
            variant="filled"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={isInvalidAddress ? styles.invalid : ''}
          />
        </Box>
        <Button variant="contained" className={styles.button} onClick={onSend} disabled={pendingTx !== ''}>
          Send
        </Button>
        {pendingTx !== '' && (
          <Button
            variant="contained"
            className={styles.button}
            onClick={() => window.open(`https://ropsten.etherscan.io/tx/${pendingTx}`, '_blank')}>
            View on etherscan
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Form;
