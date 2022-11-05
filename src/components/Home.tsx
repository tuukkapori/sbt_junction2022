import { useEffect, useState } from 'react';
import { useMetamask } from '../metamask';
import ConnectMetamaskPrompt from './ConnectMetamaskPrompt';
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { getUserByWalletId } from '../services/firebase';
import changeNetwork from '../metamask/helpers/changeNetwork';

const Home = ({ setCurrentWallet }: { setCurrentWallet: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchError, setShowSearchError] = useState(false);
  const [searching, setSearching] = useState(false);
  console.log({ windowEthereum: window.ethereum });
  const { user, chainId, setChainId } = useMetamask();
  console.log({ user, connected: user.isConnected });
  const navigate = useNavigate();

  const handleSearchCertificates = async () => {
    setSearching(true);
    setShowSearchError(false);
    console.log('Searching certificates for ', searchTerm);
    const user = await getUserByWalletId(searchTerm);
    if (user) {
      console.log('user found, redirect to profile ');
      setSearching(false);
      navigate(`/profiles/${searchTerm}`);
    } else {
      console.log('user not found, notify searcher');
      setShowSearchError(true);
      setSearching(false);
    }
  };

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
      {user.isConnected && (
        <>
          {chainId == '0x61' ? (
            <Typography variant='subtitle2'>BNB Testnet</Typography>
          ) : (
            <>
              <Typography variant='subtitle2'>
                Please connect your Metamask to BNB Testnet.
              </Typography>
              <Button
                onClick={() =>
                  changeNetwork('bnbTestnet').then(() => setChainId('0x61'))
                }>
                Change Network
              </Button>
            </>
          )}
        </>
      )}
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {!(chainId == '0x61') && (
          <Typography style={{ marginBottom: 0 }}>or</Typography>
        )}
        <Typography variant='h6'>Search by wallet address</Typography>
        <TextField
          value={searchTerm}
          placeholder='0x082bfd...'
          onChange={e => {
            setSearchTerm(e.target.value);
            setShowSearchError(false);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <Button
                  size='large'
                  disabled={!searchTerm || searching}
                  onClick={handleSearchCertificates}
                  sx={{ position: 'relative' }}>
                  Search
                  {searching && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  )}
                </Button>
              </InputAdornment>
            ),
          }}
        />

        <Typography
          sx={{
            color: 'red',
            opacity: showSearchError ? 1 : 0,
            transitionDuration: '200ms',
          }}>
          Account not found
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
