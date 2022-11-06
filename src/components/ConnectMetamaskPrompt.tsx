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
  changeNetwork,
  setChainId,
}: {
  setCurrentWallet: any;
  changeNetwork: any;
  setChainId: any;
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleConnectMetamask = async () => {
    setLoading(true);
    if (window.ethereum) {
      const account = await requestAccounts();
      if (account && account.isConnected) {
        setCurrentWalletLocalStorage(account.address);
        if (window.ethereum.chainId == '0x61') {
          const user = await getUserByWalletId(account.address);
          setLoading(false);
          if (user) {
            navigate('/profiles/me');
          } else {
            navigate('/createProfile');
          }
        } else {
          navigate('/');
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
        {!window.ethereum.selectedAddress && (
          <Button
            variant='contained'
            size='large'
            sx={{ fontWeight: 600, marginTop: 3 }}
            onClick={handleConnectMetamask}>
            Connect Metamask
          </Button>
        )}
        {window.ethereum.selectedAddress && window.ethereum.chainId !== '0x61' && (
          <>
            <Button
              variant='contained'
              size='large'
              sx={{ fontWeight: 600, marginTop: 3 }}
              onClick={() =>
                changeNetwork('bnbTestnet').then(() => {
                  setChainId('0x61');
                  handleConnectMetamask();
                })
              }>
              Change Network
            </Button>
            <Typography
              variant='subtitle1'
              sx={{ color: '#f77f00', marginTop: 1 }}>
              Please connect your Metamask to BNB Testnet.
            </Typography>
          </>
        )}
      </Box>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );
};

export default ConnectMetamaskPrompt;
