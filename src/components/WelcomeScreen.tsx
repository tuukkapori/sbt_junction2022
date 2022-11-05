import React, { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import requestAccounts from '../metamask/helpers/requestAccounts';
import { getUserByWalletId } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { setCurrentWalletLocalStorage } from '../services/localStorage';

const WelcomeScreen = ({ currentWallet, setCurrentWallet, lmao }: any) => {
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
        background:
          'linear-gradient( 105.3deg,  rgba(30,39,107,1) 21.8%, rgba(77,118,221,1) 100.2% );',
        height: '100vh',
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
        <h1 style={{ fontSize: '70px', fontWeight: 600, marginBottom: 2 }}>
          True Connect
        </h1>
        <h2 style={{ marginTop: 0 }}>Connect your wallet to get started</h2>
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

export default WelcomeScreen;
