import React from 'react';
import { Box, Button } from '@mui/material';
import requestAccounts from '../metamask/helpers/requestAccounts';
import { getUserByWalletId } from '../services/firebase';
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
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>True Connect</h1>
      <h2 style={{ fontWeight: 600 }}>Connect your wallet to get started</h2>
      <Button variant='contained' size='large' onClick={handleConnectMetamask}>
        Connect Metamask
      </Button>
    </Box>
  );
};

export default WelcomeScreen;
