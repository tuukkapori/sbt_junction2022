import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Button,
  Autocomplete,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { getUserByWalletId } from '../services/firebase';
import { SettingsEthernet } from '@mui/icons-material';
import {
  deleteCurrentWalletLocalStorage,
  getCurrentWalletFromLocalStorage,
} from '../services/localStorage';

const Navigation = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<any>(null);
  const [profileMenOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchparams] = useSearchParams();
  const [isInstitutionalAccount, setInstitutionalAccount] = useState(false);
  const params = useParams();
  const location = useLocation();
  console.log('location ', location);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    console.log('search term ', searchTerm);
    navigate(`search?q=${searchTerm}`);
  };

  const handleOpenProfileMenu = (e: any) => {
    setProfileMenuAnchor(e.currentTarget);
    setProfileMenuOpen(true);
  };

  const handleLogOut = () => {
    deleteCurrentWalletLocalStorage();
    navigate('/');
    setProfileMenuAnchor(null);
  };

  useEffect(() => {
    const checkUser = async () => {
      console.log('checking user ');
      const currentWallet = getCurrentWalletFromLocalStorage();
      if (currentWallet) {
        const user = await getUserByWalletId(currentWallet);
        setUser(user);
      } else {
        setUser(null);
      }
    };
    checkUser();
  }, [location]);
  if (!window.ethereum) navigate("/");
  return (
    <div>
      {window.ethereum?.selectedAddress && window.ethereum.chainId === '0x61' && (
        <AppBar position='sticky'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0px 5vw',
              alignItems: 'center',
            }}>
            <MenuItem onClick={() => navigate('/')}>
              <Typography textAlign='center'>Home</Typography>
            </MenuItem>
            <Box sx={{ display: 'flex' }}>
              <Box component='form' onSubmit={(e: any) => handleSearch(e)}>
                <TextField
                  size='small'
                  variant='outlined'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder='Enter wallet address'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Button disabled={!searchTerm} type='submit'>
                          Search
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
            {user && user.accountType == 'institution' && (
              <MenuItem onClick={() => navigate('/send')}>
                <Typography textAlign='center'>Mint</Typography>
              </MenuItem>
            )}
            {user ? (
              <IconButton
                onClick={() => navigate('/profiles/me')}
                sx={{ marginLeft: 2 }}>
                <Avatar src={user.profilePicture} />
              </IconButton>
            ) : (
              <Box sx={{ width: '20px', height: '20px', m: 2.2 }} />
            )}

            <Menu
              id='basic-menu'
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor) && profileMenOpen}
              onClose={() => setProfileMenuOpen(false)}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}>
              <MenuItem onClick={() => navigate('profiles/me')}>
                My profile
              </MenuItem>
              {/* <MenuItem onClick={handleLogOut}>Log out</MenuItem> */}
            </Menu>
          </Box>
        </AppBar>
      )}

      <Outlet />
    </div>
  );
};

export default Navigation;
