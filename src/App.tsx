import { MetamaskProvider } from './metamask/context';
import HelloMetamask from './components/HelloMetamask';
import { app } from './firebase';
import { Container } from '@mui/material';
import Profile from './components/Profile';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
console.log(app);

export default function App() {
  const [currentUser, setCurrentUser] = useState({ id: '1' });

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 20 }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Welcome</div>} />
          <Route
            path="/profiles/2"
            element={
              <Profile
                id="2"
                name="Teemu Teekkari"
                bio="Up and coming web3 developer"
                currentUser={currentUser}
              />
            }
          />
        </Routes>
        {/* <MetamaskProvider> */}
        {/* <HelloMetamask /> */}

        {/* </MetamaskProvider> */}
      </BrowserRouter>
    </Container>
  );
}
