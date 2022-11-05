import React from 'react';
import { Box, Button } from '@mui/material';
import requestAccounts from '../metamask/helpers/requestAccounts';
import { getUserByWalletId } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { setCurrentWalletLocalStorage } from '../services/localStorage';

const WelcomeScreen = ({ currentWallet, setCurrentWallet, lmao }: any) => {
  const navigate = useNavigate();
  const handleConnectMetamask = async () => {
    if (window.ethereum) {
      const account = await requestAccounts();
      if (account && account.isConnected) {
        setCurrentWalletLocalStorage(account.address);

        const user = await getUserByWalletId(account.address);
        if (user) {
          navigate('/profiles/me');
        } else {
          navigate('/createProfile');
        }
      }
    }
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
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>True Connect</h1>
        <h2 style={{ fontWeight: 600 }}>Connect your wallet to get started</h2>
        <Button
          variant='contained'
          size='large'
          onClick={handleConnectMetamask}>
          Connect Metamask
        </Button>
      </Box>
    </Box>
  );
};

export default WelcomeScreen;
