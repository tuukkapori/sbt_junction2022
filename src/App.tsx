import { MetamaskProvider } from './metamask/context';
import HelloMetamask from './components/HelloMetamask';
import { app } from './firebase';
import { AppBar, Avatar, Container } from '@mui/material';
import Profile from './components/Profile';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profiles from './components/Profiles';
import Navigation from './components/Navigation';
import './index.css';
import ProfileSearchResults from './components/ProfileSearchResults';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
  const [currentUser, setCurrentUser] = useState({ id: '1' });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigation />}>
              <Route index element={<div>hello</div>} />
              <Route path='/search' element={<ProfileSearchResults />} />
              <Route path='profiles' element={<Profiles />} />
              <Route
                path='/profiles/:walletId'
                element={<Profile currentUser={currentUser} />}
              />
            </Route>
          </Routes>
          {/* <MetamaskProvider> */}
          {/* <HelloMetamask /> */}

          {/* </MetamaskProvider> */}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
