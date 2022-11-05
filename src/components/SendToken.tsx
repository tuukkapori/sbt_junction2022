import { useState } from 'react';
import {
  TextField,
  Select,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Paper,
  Typography,
  Card,
} from '@mui/material';
import { nanoid } from 'nanoid';
import { createCert, getUserByWalletId } from '../services/firebase';
import { createCertificate } from '../services/blockchain';

const SendToken = () => {
  const [receiver, setReceiver] = useState('');
  const [tokenType, setTokenType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [screen, setScreen] = useState('create');

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const issuerAddress = window.ethereum.selectedAddress;
      const user = await getUserByWalletId(issuerAddress);

      if (receiver) {
        const uri = nanoid();
        const lowerCaseReceiver = receiver.toLowerCase();
        const transactionHash = await createCertificate(lowerCaseReceiver, uri);
        const data = {
          receiver: lowerCaseReceiver,
          issuerAddress,
          issuerName: user.name,
          type: tokenType,
          title,
          description,
          startDate,
          endDate,
          transactionHash,
        };
        console.log('TOKEN DATA ', data);
        await createCert(uri, data);
        // setReceiver('');
        // setTokenType('');
        // setStartDate('');
        // setEndDate('');
        // setCompanyName('');
        // setSchoolName('');
        // setDegree('');
        // setPosition('');
        // setDescription('');
      }
      setScreen('success');
    } catch (error) {
      setScreen('failure');
    }
  };

  return (
    <>
      {screen === 'create' && (
        <Card
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            marginTop: 5,
            p: 3,
            maxWidth: '90vw',
            width: '600px',
          }}>
          <Box
            component='form'
            onSubmit={onSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& .MuiFormControl-root': {
                m: 1,
                width: '100%',
              },
            }}
            mx={2}>
            <Typography variant='h4' sx={{ textAlign: 'center' }}>
              Mint a new certificate
            </Typography>
            <FormControl>
              <TextField
                name='receiver'
                label='Receiver'
                // placeholder='Wallet ID'
                id='receiver'
                onChange={(e: any) => setReceiver(e.target.value)}
                value={receiver}
              />
            </FormControl>

            <FormControl>
              <InputLabel>Token Type</InputLabel>
              <Select
                sx={{ ml: 1, mr: -1 }}
                name='tokenType'
                // label='Token Type'
                // placeholder='YYYY-MM-DD'
                id='tokenType'
                onChange={(e: any) => setTokenType(e.target.value)}
                value={tokenType}>
                <MenuItem value='education'>Education</MenuItem>
                <MenuItem value='work'>Work</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                name='title'
                label='Title'
                id='title'
                onChange={(e: any) => setTitle(e.target.value)}
                value={title}
              />
            </FormControl>
            <FormControl>
              <TextField
                name='description'
                label='Description'
                // placeholder='YYYY-MM-DD'
                id='description'
                onChange={(e: any) => setDescription(e.target.value)}
                value={description}
              />
            </FormControl>
            <FormControl>
              <TextField
                name='startDate'
                label='Start Date'
                // placeholder='YYYY-MM-DD'
                id='startDate'
                onChange={(e: any) => setStartDate(e.target.value)}
                value={startDate}
              />
            </FormControl>
            <FormControl>
              <TextField
                name='endDate'
                label='End Date'
                // placeholder='YYYY-MM-DD'
                id='endDate'
                onChange={(e: any) => setEndDate(e.target.value)}
                value={endDate}
              />
            </FormControl>

            <Button type='submit' variant='contained'>
              Create certificate
            </Button>
          </Box>
        </Card>
      )}
      {screen === 'success' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography variant='h4'>
            Certificate created successfully!
          </Typography>
          <Button onClick={() => setScreen('create')}>
            Create a new certificate
          </Button>
        </Box>
      )}
      {screen === 'failure' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <h1>Error creating certificate</h1>
          <Button onClick={() => setScreen('create')}>Try again</Button>
        </Box>
      )}
    </>
  );
};

export default SendToken;
