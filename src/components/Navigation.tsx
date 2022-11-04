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
} from '@mui/material';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { getUserByWalletId } from '../firebase';
import { SettingsEthernet } from '@mui/icons-material';

const Navigation = ({ children }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<any>(null);
  const [profileMenOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchparams] = useSearchParams();

  useEffect(() => {}, [searchParams]);

  const handleSearch = async () => {
    console.log('search term ', searchTerm);
    navigate(`search?q=${searchTerm}`);
  };

  const handleOpenProfileMenu = (e: any) => {
    setProfileMenuAnchor(e.currentTarget);
    setProfileMenuOpen(true);
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
          <Box sx={{ display: 'flex' }}>
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
                    <Button onClick={handleSearch} disabled={!searchTerm}>
                      Search
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
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
            <MenuItem>Disconnect wallet</MenuItem>
          </Menu>
        </Box>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Navigation;
