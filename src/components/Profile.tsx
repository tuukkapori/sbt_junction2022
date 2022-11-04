import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Education from './Education';
import WorkHistory from './WorkHistory';
import Connect from './Connect';
import {
  ProfileInfo,
  getProfileFromBlockchain,
  getProfileFromFirebase,
} from '../services/profileInfo';
import { useParams } from 'react-router-dom';

const Profile = ({ currentUser }: { currentUser: { id: string } }) => {
  const { walletId } = useParams();
  console.log({ walletId });
  const [profileInfo, setProfileInfo] = useState(null);
  const [education, setEducation] = useState(null);
  const [workHistory, setWorkHistory] = useState(null);

  useEffect(() => {
    const fetchData = async (walletId: string) => {
      const profileInfo = await getProfileFromFirebase(walletId);
      setProfileInfo(profileInfo);

      const { education: educationData, workHistory: workHistoryData } =
        await getProfileFromBlockchain(walletId);
      setEducation(educationData);
      setWorkHistory(workHistoryData);
    };
    fetchData(walletId);
  }, []);

  return (
    <div>
      <Paper elevation={3} sx={{ padding: 5 }}>
        {profileInfo ? (
          <div>
            {profileInfo.name ? (
              <Typography variant="h3">{profileInfo.name}</Typography>
            ) : (
              <Typography variant="h3">Wallet ID</Typography>
            )}
            {profileInfo.bio ? (
              <div>{profileInfo.bio}</div>
            ) : (
              <div>Bio missing</div>
            )}
            <div>connections: 42</div>
            <Connect />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Paper>
      <Education items={education} />
      <WorkHistory items={workHistory} />
    </div>
  );
};

export default Profile;
