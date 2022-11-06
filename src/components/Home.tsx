import { useMetamask } from '../metamask';
import ConnectMetamaskPrompt from './ConnectMetamaskPrompt';
import { Typography, Box, Button } from '@mui/material';
import changeNetwork from '../metamask/helpers/changeNetwork';

const Home = ({ setCurrentWallet }: { setCurrentWallet: any }) => {
  console.log({ windowEthereum: window.ethereum });
  const { user, setChainId } = useMetamask();
  console.log({ user, connected: user.isConnected });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        marginTop: '15%',
      }}>
      <Typography
        variant='h1'
        style={{ fontSize: '130px', fontWeight: 600, marginBottom: 2 }}>
        Zerify
      </Typography>
      <Typography variant='h5' mt={2}>
        Your work experience on the blockchain.
      </Typography>
      {window.ethereum?.selectedAddress ? (
        <Typography variant='subtitle1'>Connected to Metamask</Typography>
      ) : (
        <ConnectMetamaskPrompt
          setCurrentWallet={setCurrentWallet}
          changeNetwork={changeNetwork}
          setChainId={setChainId}
        />
      )}
      {window.ethereum?.selectedAddress && window.ethereum.chainId === '0x61' && (
        <>
          <Typography variant='subtitle1'>BNB Testnet</Typography>
          <a
            href='https://testnet.binance.org/faucet-smart'
            target='_blank'
            rel='noopener noreferrer'
            style={{textDecoration:'none'}}>
            <Button
              variant='contained'
              size='large'
              sx={{ fontWeight: 600, marginTop: 3, }}>
              Add Free Test Currency
            </Button>
          </a>
        </>
      )}
    </Box>
  );
};

export default Home;
