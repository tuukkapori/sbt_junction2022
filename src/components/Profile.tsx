import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import EducationList from './EducationList';
import WorkHistoryList from './WorkHistoryList';
import ProfileInfo from './ProfileInfo';

import {
  getProfileFromBlockchain,
  getProfileFromFirebase,
} from '../services/profileInfo';
import { useParams } from 'react-router-dom';

const Profile = ({ currentUser }: { currentUser: { id: string } }) => {
  const { walletId } = useParams();
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiBox-root': {
          margin: '20px 0px',
          minWidth: 700,
          maxWidth: 700,
        },
      }}>
      {profileInfo ? (
        <Box>
          <ProfileInfo data={profileInfo} />
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
      {workHistory ? (
        <Box>
          <WorkHistoryList items={workHistory} />
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
      {education ? (
        <Box>
          <EducationList items={education} />
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default Profile;
