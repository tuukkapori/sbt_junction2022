import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';

const SendToken = () => {
  const [receiver, setReceiver] = useState('');
  const [tokenType, setTokenType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [degree, setDegree] = useState('');

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
    });
    setReceiver('');
    setTokenType('');
    setStartDate('');
    setEndDate('');
    setCompanyName('');
    setSchoolName('');
    setDegree('');
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Issue a new certificate token</h2>
      <div>
        <TextField
          name='receiver'
          label='Receiver'
          // placeholder='Wallet ID'
          id='receiver'
          onChange={(e: any) => setReceiver(e.target.value)}
          value={receiver}
        />
      </div>
      <div>
        <select
          name='tokenType'
          // label='Token Type'
          // placeholder='YYYY-MM-DD'
          id='tokenType'
          onChange={(e: any) => setTokenType(e.target.value)}
          value={tokenType}>
          <option />
          <option value='education'>Education</option>
          <option value='job'>Job</option>
        </select>
      </div>
      <div>
        <TextField
          name='startDate'
          label='Start Date'
          // placeholder='YYYY-MM-DD'
          id='startDate'
          onChange={(e: any) => setStartDate(e.target.value)}
          value={startDate}
        />
      </div>
      <div>
        <TextField
          name='endDate'
          label='End Date'
          // placeholder='YYYY-MM-DD'
          id='endDate'
          onChange={(e: any) => setEndDate(e.target.value)}
          value={endDate}
        />
      </div>
      <div>
        <TextField
          name='companyName'
          label='Company Name'
          // placeholder='Company'
          id='companyName'
          onChange={(e: any) => setCompanyName(e.target.value)}
          value={companyName}
        />
      </div>
      <div>
        <TextField
          name='schoolName'
          label='School Name'
          // placeholder='School'
          id='schoolName'
          onChange={(e: any) => setSchoolName(e.target.value)}
          value={schoolName}
        />
      </div>
      <div>
        <TextField
          name='degree'
          label='Degree'
          // placeholder='"Bachelor of Science"'
          id='degree'
          onChange={(e: any) => setDegree(e.target.value)}
          value={degree}
        />
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default SendToken;
