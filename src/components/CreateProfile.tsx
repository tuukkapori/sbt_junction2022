import {
  Box,
  InputLabel,
  TextareaAutosize,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Button,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, uploadProfilePic } from '../services/firebase';
import { useMetamask } from '../metamask';
import { getCurrentWalletFromLocalStorage } from '../services/localStorage';

const CreateProfile = ({ currentWallet, setCurrentWallet }: any) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [loadingPpf, setLoadingPpf] = useState(false);
  const [creatingProfile, setCreatingProfile] = useState(false);

  const [profilePicFile, setProfilePicFile] = useState<any>(null);

  const navigate = useNavigate();

  const onFileChange = async (e: any) => {
    setLoadingPpf(true);
    const file = e.target.files[0];
    console.log('file change ', e);
    setProfilePicFile(file);
    console.log('user from upper ', currentWallet);
    const url = await uploadProfilePic(file, currentWallet);
    console.log('url from uploading ppf ', url);
    setProfilePictureUrl(url);
    setLoadingPpf(false);
  };

  const handleSetProfilePic = () => {
    const input = document.getElementById('profile-pic-selector');
    input.click();
  };

  const handleCreateProfile = async () => {
    console.log('creating profile...');
    setCreatingProfile(true);
    await createUser(
      getCurrentWalletFromLocalStorage(),
      name,
      bio,
      profilePictureUrl
    );
    navigate('/profiles/me');
  };
  return (
    <Box
      sx={{
        height: '100vh',
        paddingTop: '100px',
        background:
          'linear-gradient( 105.3deg,  rgba(30,39,107,1) 21.8%, rgba(77,118,221,1) 100.2% );',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      }}>
      <h2>Create profile</h2>
      <Tooltip title='add a profile picture'>
        <IconButton onClick={handleSetProfilePic}>
          {loadingPpf ? (
            <Avatar
              src={profilePicFile ? URL.createObjectURL(profilePicFile) : ''}
              sx={{ width: 80, height: 80 }}>
              <CircularProgress />
            </Avatar>
          ) : (
            <Avatar
              src={profilePicFile ? URL.createObjectURL(profilePicFile) : ''}
              sx={{ width: 80, height: 80 }}></Avatar>
          )}
        </IconButton>
      </Tooltip>
      <input
        type='file'
        id='profile-pic-selector'
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      <TextField
        label='Name'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <InputLabel>Bio</InputLabel>
      <TextareaAutosize
        value={bio}
        onChange={e => setBio(e.target.value)}
        minRows={5}
        style={{
          fontFamily: 'Roboto',
          fontSize: '18px',
          background: 'rgba(0, 0, 0, 0)',
          color: 'white',
        }}
      />
      <Button
        variant='contained'
        disabled={!name || !bio}
        onClick={handleCreateProfile}>
        Create profile!
      </Button>
    </Box>
  );
};

export default CreateProfile;
