import React, { useState } from 'react';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import requestAccounts from '../metamask/helpers/requestAccounts';
import { getUserByWalletId } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { setCurrentWalletLocalStorage } from '../services/localStorage';

const ConnectMetamaskPrompt = ({
  setCurrentWallet,
}: {
  setCurrentWallet: any;
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleConnectMetamask = async () => {
    setLoading(true);
    if (window.ethereum) {
      const account = await requestAccounts();
      if (account && account.isConnected) {
        setCurrentWalletLocalStorage(account.address);

        const user = await getUserByWalletId(account.address);
        setLoading(false);
        if (user) {
          navigate('/profiles/me');
        } else {
          navigate('/createProfile');
        }
      }
    }
    setLoading(false);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'OpenSans-Bold',
        }}>
        <h2 style={{ marginTop: 0, textAlign: 'center' }}>
          Your work experience on the blockchain.
        </h2>
        <Button
          variant='contained'
          size='large'
          sx={{ fontWeight: 600 }}
          onClick={handleConnectMetamask}>
          Connect Metamask
        </Button>
      </Box>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );
};

export default ConnectMetamaskPrompt;
