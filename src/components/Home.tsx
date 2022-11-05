import { useEffect, useState } from 'react';
import { useMetamask } from '../metamask';
import ConnectMetamaskPrompt from './ConnectMetamaskPrompt';
import { Typography, Box } from '@mui/material';

const Home = ({ setCurrentWallet }: { setCurrentWallet: any }) => {
  console.log({ windowEthereum: window.ethereum });
  const { user, setContract } = useMetamask();
  console.log({ user, connected: user.isConnected });
  const [isBinance, setIsBinance] = useState(false);
  useEffect(() => {
    if (window.ethereum.chainId === '0x61') {
      setIsBinance(true);
    } else {
      setIsBinance(false);
    }
  }, [window.ethereum.chainId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography
        variant='h1'
        style={{ fontSize: '130px', fontWeight: 600, marginBottom: 2 }}>
        Zerify
      </Typography>
      {user.isConnected ? (
        <Typography variant='subtitle1'>Metamask connected</Typography>
      ) : (
        <ConnectMetamaskPrompt setCurrentWallet={setCurrentWallet} />
      )}
      {isBinance ? (
        <Typography variant='subtitle2'>Connected to Binance</Typography>
      ) : (
        <Typography variant='subtitle2'>
          Please connect your Metamask to Binance with chain ID 97
        </Typography>
      )}
    </Box>
  );
};

export default Home;
