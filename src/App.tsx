import { MetamaskProvider } from './metamask/context';
import HelloMetamask from './components/HelloMetamask';
import { app } from './firebase';
import { AppBar, Avatar, Container } from '@mui/material';
import Profile from './components/Profile';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Profiles from './components/Profiles';
import Navigation from './components/Navigation';
import './index.css';
import ProfileSearchResults from './components/ProfileSearchResults';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import WelcomeScreen from './components/WelcomeScreen';
import CreateProfile from './components/CreateProfile';
import SendToken from './components/SendToken';

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
  const [currentWallet, setCurrentWallet] = useState<any>('sadfsadf');

  console.log('setCurrentWallet from app', setCurrentWallet);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/welcome' element={<WelcomeScreen />} />
            <Route
              path='/createProfile'
              element={
                <CreateProfile
                  currentWallet={currentWallet}
                  setCurrentWallet={setCurrentWallet}
                />
              }
            />
            <Route path='/' element={<Navigation />}>
              <Route
                index
                element={
                  <WelcomeScreen
                    lmao={'fuck'}
                    currentWallet={'lmao'}
                    setCurrentWallet={setCurrentWallet}
                  />
                }
              />
              <Route path='/search' element={<ProfileSearchResults />} />
              <Route path='profiles' element={<Profiles />} />
              <Route
                path='/profiles/:walletId'
                element={<Profile currentWallet={currentWallet} />}
              />
              <Route path='/send' element={<SendToken />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
