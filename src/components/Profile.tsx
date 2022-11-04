import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Education from './Education';
import WorkHistory from './WorkHistory';
import Connect from './Connect';
import { getProfileInfo } from '../services/profileInfo';
import { useParams } from 'react-router-dom';

const Profile = ({
  name,
  bio,
  currentUser,
}: {
  name: string;
  bio: string;
  currentUser: { id: string };
}) => {
  const id = '2';
  const [education, setEducation] = useState(null);
  const [workHistory, setWorkHistory] = useState(null);

  useEffect(() => {
    const fetchData = async (id: string) => {
      const { education: educationData, workHistory: workHistoryData } =
        await getProfileInfo(id);
      setEducation(educationData);
      setWorkHistory(workHistoryData);
    };
    fetchData(id);
  }, []);

  return (
    <div>
      <Paper elevation={3} sx={{ padding: 5 }}>
        {name ? (
          <Typography variant="h3">{name}</Typography>
        ) : (
          <Typography variant="h3">Wallet ID</Typography>
        )}
        <div>{bio}</div>
        <div>connections: 42</div>
        <Connect />
      </Paper>
      <Education items={education} />
      <WorkHistory items={workHistory} />
    </div>
  );
};

export default Profile;
