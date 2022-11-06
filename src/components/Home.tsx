import { useState } from 'react';
import { useMetamask } from '../metamask';
import ConnectMetamaskPrompt from './ConnectMetamaskPrompt';
import { Typography, Box } from '@mui/material';
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

  const handleSearchCertificates = async (e: any) => {
    e.preventDefault();
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
      {window.ethereum.selectedAddress ? (
        <Typography variant='subtitle1'>Connected to Metamask</Typography>
      ) : (
        <ConnectMetamaskPrompt
          setCurrentWallet={setCurrentWallet}
          changeNetwork={changeNetwork}
          setChainId={setChainId}
        />
      )}
      {window.ethereum?.selectedAddress &&
        window.ethereum.chainId === '0x61' && (
          <Typography variant='subtitle1'>BNB Testnet</Typography>
        )}
    </Box>
  );
};

export default Home;
