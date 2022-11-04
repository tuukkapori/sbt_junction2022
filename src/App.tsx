// import { MetamaskProvider } from './metamask/context';
// import HelloMetamask from './components/HelloMetamask';
import Profile from './components/Profile';
import { Container } from '@mui/material';

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
