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
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { uploadProfilePic } from '../firebase';
import { useMetamask } from '../metamask';

const CreateProfile = ({ currentWallet, setCurrentWallet }: any) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  const [profilePicFile, setProfilePicFile] = useState<any>(null);

  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    console.log('file change ', e);
    setProfilePicFile(file);
    console.log('user from upper ', currentWallet);
    const url = await uploadProfilePic(file, currentWallet);
    console.log('url from uploading ppf ', url);
    setProfilePictureUrl(url);
  };

  const handleSetProfilePic = () => {
    const input = document.getElementById('profile-pic-selector');
    input.click();
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
          <Avatar
            src={profilePicFile ? URL.createObjectURL(profilePicFile) : ''}
            sx={{ width: 80, height: 80 }}
          />
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
      <Button variant='contained'>Create profile!</Button>
    </Box>
  );
};

export default CreateProfile;
