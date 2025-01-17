import { MetamaskProvider } from './metamask/context';
import { Box } from '@mui/material';
import Profile from './components/Profile';
import ProfileExample from './components/ProfileExample';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import './index.css';
import ProfileSearchResults from './components/ProfileSearchResults';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CreateProfile from './components/CreateProfile';
import SendToken from './components/SendToken';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [currentWallet, setCurrentWallet] = useState<any>(null);

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
                  'linear-gradient( 105.3deg,  #02c2c2 21.8%, #5b5dcf 100.2% );',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Routes>
                <Route
                  path='/'
                  element={<Home setCurrentWallet={setCurrentWallet} />}
                />
                <Route
                  path='/createProfile'
                  element={
                    <CreateProfile
                      currentWallet={currentWallet}
                      setCurrentWallet={setCurrentWallet}
                    />
                  }
                />
                <Route path='/search' element={<ProfileSearchResults />} />
                <Route path='/profiles/:walletId' element={<Profile />} />
                <Route path='/example' element={<ProfileExample />} />
                <Route path='/send' element={<SendToken />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </MetamaskProvider>
  );
}
