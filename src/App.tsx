import { MetamaskProvider } from './metamask/context';
import HelloMetamask from './components/HelloMetamask';
import { app } from './firebase';
import { Container } from '@mui/material';
import Profile from './components/Profile';
import { useState } from 'react';
console.log(app);

export default function App() {
  const [currentUser, setCurrentUser] = useState({ id: '1' });

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 20 }}>
      {/* <MetamaskProvider> */}
      {/* <HelloMetamask /> */}
      <Profile
        id="2"
        name="Teemu Teekkari"
        bio="Up and coming web3 developer"
        currentUser={currentUser}
      />
      {/* </MetamaskProvider> */}
    </Container>
  );
}
