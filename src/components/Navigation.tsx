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
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { getUserByWalletId } from '../services/firebase';
import { SettingsEthernet } from '@mui/icons-material';
import { deleteCurrentWalletLocalStorage } from '../services/localStorage';

const Navigation = ({ children }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<any>(null);
  const [profileMenOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchparams] = useSearchParams();

  useEffect(() => {}, [searchParams]);

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
  };

  return (
    <div>
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
          <MenuItem onClick={() => navigate('/send')}>
            <Typography textAlign='center'>Mint</Typography>
          </MenuItem>
          <IconButton onClick={handleOpenProfileMenu} sx={{ marginLeft: 2 }}>
            <Avatar />
          </IconButton>
          <Menu
            id='basic-menu'
            anchorEl={profileMenuAnchor}
            open={profileMenOpen}
            onClose={() => setProfileMenuOpen(false)}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <MenuItem onClick={() => navigate('profiles/me')}>
              My profile
            </MenuItem>
            <MenuItem onClick={handleLogOut}>Log out</MenuItem>
          </Menu>
        </Box>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Navigation;
