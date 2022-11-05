import React, { useState } from 'react';
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
  Grid,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { getUserByWalletId } from '../firebase';
import { SettingsEthernet } from '@mui/icons-material';

const Navigation = ({ children }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<any>(null);
  const [profileMenOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: any) => {
    e.preventDefault();
    console.log('search term ', searchTerm);
    navigate(`profiles/${searchTerm}`);
  };

  const handleOpenProfileMenu = (e: any) => {
    setProfileMenuAnchor(e.currentTarget);
    setProfileMenuOpen(true);
  };

  return (
    <div>
      <AppBar position='sticky' sx={{ padding: 1, background: 'black' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0px 30px',
            alignItems: 'center',
          }}>
          <MenuItem onClick={() => navigate('/')}>
            <Typography textAlign='center'>Home</Typography>
          </MenuItem>
          <MenuItem>
            <Box component='form' onSubmit={(e: any) => handleSearch(e)}>
              <Grid container>
                <Grid item xs={9}>
                  <TextField
                    size='small'
                    variant='outlined'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    sx={{ input: { color: 'white' } }}
                    placeholder='Wallet address'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <IconButton sx={{ color: 'white' }}>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Button type='submit' sx={{ color: 'white' }}>
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </MenuItem>

          <MenuItem onClick={() => navigate('/send')}>
            <Typography textAlign='center'>Mint</Typography>
          </MenuItem>
          <IconButton onClick={handleOpenProfileMenu}>
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
