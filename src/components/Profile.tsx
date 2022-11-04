import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import Education from './Education';
import WorkHistory from './WorkHistory';
import Connect from './Connect';
import { getProfileInfo } from '../services/profileInfo';

const Profile = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  const [education, setEducation] = useState(null);
  const [workHistory, setWorkHistory] = useState(null);

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
        <div>{name}</div>
        <div>{description}</div>
        <Connect />
      </Paper>
      <Education items={education} />
      <WorkHistory items={workHistory} />
    </div>
  );
};

export default Profile;
