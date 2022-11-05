import { MetamaskProvider } from './metamask/context';
import HelloMetamask from './components/HelloMetamask';
import { app } from './services/firebase';
import { AppBar, Avatar, Container, Box } from '@mui/material';
import Profile from './components/Profile';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Profiles from './components/Profiles';
import Navigation from './components/Navigation';
import './index.css';
import ProfileSearchResults from './components/ProfileSearchResults';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import WelcomeScreen from './components/ConnectMetamaskPrompt';
import CreateProfile from './components/CreateProfile';
import SendToken from './components/SendToken';
import { getSymbol } from './services/blockchain';
import Home from './components/Home';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(0, 0, 0, 0)',
    },
  },
});
console.log(app);

export default function App() {
  const [currentWallet, setCurrentWallet] = useState<any>(null);

  console.log({ currentWallet });
  // console.log('setCurrentWallet from app', setCurrentWallet);

  useEffect(() => {
    const func = async () => {
      console.log('calling');
      const symbol = await getSymbol();
      console.log({ symbol });
    };
    func();
  }, []);

  console.log('rendering....');

  return (
    <MetamaskProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Box>
            <Navigation />
            <Box
              sx={{
                background:
                  'linear-gradient( 105.3deg,  rgba(30,39,107,1) 21.8%, rgba(77,118,221,1) 100.2% );',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Routes>
                <Route
                  path='/createProfile'
                  element={
                    <CreateProfile
                      currentWallet={currentWallet}
                      setCurrentWallet={setCurrentWallet}
                    />
                  }
                />
                <Route
                  path='/'
                  element={<Home setCurrentWallet={setCurrentWallet} />}
                />
                <Route path='/search' element={<ProfileSearchResults />} />
                <Route path='profiles' element={<Profiles />} />
                <Route
                  path='/profiles/:walletId'
                  element={<Profile currentWallet={currentWallet} />}
                />
                <Route path='/send' element={<SendToken />} />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </MetamaskProvider>
  );
}
