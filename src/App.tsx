import { MetamaskProvider } from './metamask/context';
import HelloMetamask from './components/HelloMetamask';
import { Container } from '@mui/material';
import Profile from './components/Profile';

export default function App() {
  return (
    <Container maxWidth="sm" sx={{ paddingTop: 20 }}>
      {/* <MetamaskProvider> */}
      {/* <HelloMetamask /> */}
      <Profile
        name="Teemu Teekkari"
        description="Up and coming web3 developer"
      />
      {/* </MetamaskProvider> */}
    </Container>
  );
}
