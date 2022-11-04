import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Education from './Education';
import WorkHistory from './WorkHistory';
import Connect from './Connect';
import { getProfileInfo } from '../services/profileInfo';

const Profile = ({
  id,
  name,
  bio,
}: {
  id: string;
  name: string;
  bio: string;
}) => {
  const [education, setEducation] = useState(null);
  const [workHistory, setWorkHistory] = useState(null);
  const [currentUser, setCurrentUser] = useState({ id: '1' });

  useEffect(() => {
    const fetchData = async () => {
      const { education: educationData, workHistory: workHistoryData } =
        await getProfileInfo();
      setEducation(educationData);
      setWorkHistory(workHistoryData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Paper elevation={3} sx={{ padding: 5 }}>
        {name ? (
          <Typography variant="h3">{name}</Typography>
        ) : (
          <Typography variant="h3">{id}</Typography>
        )}
        <div>{bio}</div>
        <div>connections: 42</div>
        {id != currentUser.id && <Connect />}
      </Paper>
      <Education items={education} />
      <WorkHistory items={workHistory} />
    </div>
  );
};

export default Profile;
