import { useEffect, useState } from 'react';
import { useMetamask } from '../metamask';
import ConnectMetamaskPrompt from './ConnectMetamaskPrompt';
import { Typography, Box, Button } from '@mui/material';
import changeNetwork from '../metamask/helpers/changeNetwork';

const Home = ({ setCurrentWallet }: { setCurrentWallet: any }) => {
  console.log({ windowEthereum: window.ethereum });
  const { user, setContract } = useMetamask();
  console.log({ user, connected: user.isConnected });
  const [isBinance, setIsBinance] = useState(false);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    if (window.ethereum.chainId === '0x61') {
      setIsBinance(true);
    } else {
      setIsBinance(false);
    }
  }, [window.ethereum.chainId, toggle]);

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
        <Typography variant='subtitle1'>Connected to Metamask</Typography>
      ) : (
        <ConnectMetamaskPrompt setCurrentWallet={setCurrentWallet} />
      )}
      {isBinance ? (
        <Typography variant='subtitle2'>BNB Testnet</Typography>
      ) : (
        <>
          <Typography variant='subtitle2'>
            Please connect your Metamask to BNB Testnet.
          </Typography>
          <Button
            onClick={() =>
              changeNetwork('bnbTestnet').then(() => {
                setToggle(!toggle);
              })
            }>
            Change Network
          </Button>
        </>
      )}
    </Box>
  );
};

export default Home;
