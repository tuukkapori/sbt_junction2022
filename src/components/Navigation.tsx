import React, { useState } from 'react'
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
} from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { getUserByWalletId } from '../firebase'
import { SettingsEthernet } from '@mui/icons-material'

const Navigation = ({ children }: any) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<any>(null)
  const [profileMenOpen, setProfileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = async () => {
    console.log('search term ', searchTerm)
    navigate(`profiles/${searchTerm}`)
  }

  const handleOpenProfileMenu = (e: any) => {
    setProfileMenuAnchor(e.currentTarget)
    setProfileMenuOpen(true)
  }

  return (
    <div>
      <AppBar position="sticky" sx={{ padding: 1, background: 'black' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0px 50px',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <TextField
              size="small"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ background: 'rgba(255, 255, 255, 0.9)' }}
              placeholder="Enter wallet address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button onClick={handleSearch}>Search</Button>
          </Box>
          <IconButton onClick={handleOpenProfileMenu}>
            <Avatar />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={profileMenuAnchor}
            open={profileMenOpen}
            onClose={() => setProfileMenuOpen(false)}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => navigate('profiles/me')}>
              My profile
            </MenuItem>
            <MenuItem>Disconnect wallet</MenuItem>
          </Menu>
        </Box>
      </AppBar>
      <Outlet />
    </div>
  )
}

export default Navigation
