import { useState } from 'react';
import {
  TextField,
  Select,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';

const SendToken = () => {
  const [receiver, setReceiver] = useState('');
  const [tokenType, setTokenType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [degree, setDegree] = useState('');
  const [position, setPosition] = useState('');

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log('submitted');
    console.log({
      receiver,
      tokenType,
      startDate,
      endDate,
      companyName,
      schoolName,
      degree,
      position,
    });
    setReceiver('');
    setTokenType('');
    setStartDate('');
    setEndDate('');
    setCompanyName('');
    setSchoolName('');
    setDegree('');
    setPosition('');
  };

  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiFormControl-root': { m: 1, width: '50ch' },
      }}
      mx={2}>
      <h2>Mint a new certificate</h2>
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
          name='tokenType'
          // label='Token Type'
          // placeholder='YYYY-MM-DD'
          id='tokenType'
          onChange={(e: any) => setTokenType(e.target.value)}
          value={tokenType}>
          <MenuItem value=''></MenuItem>
          <MenuItem value='education'>Education</MenuItem>
          <MenuItem value='work'>Work</MenuItem>
        </Select>
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
      {tokenType === 'work' && (
        <FormControl>
          <TextField
            name='position'
            label='Position'
            // placeholder='"Software Engineer"'
            id='position'
            onChange={(e: any) => setPosition(e.target.value)}
            value={position}
          />
        </FormControl>
      )}
      {tokenType === 'education' && (
        <FormControl>
          <TextField
            name='degree'
            label='Degree'
            // placeholder='"Bachelor of Science"'
            id='degree'
            onChange={(e: any) => setDegree(e.target.value)}
            value={degree}
          />
        </FormControl>
      )}
      <Button type='submit' variant='outlined'>
        Submit
      </Button>
    </Box>
  );
};

export default SendToken;
