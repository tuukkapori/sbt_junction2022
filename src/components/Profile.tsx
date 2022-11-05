import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EducationList from './EducationList';
import WorkHistoryList from './WorkHistoryList';
import ProfileInfo from './ProfileInfo';

import { getProfileFromBlockchain } from '../services/blockchain';
import { getUserByWalletId } from '../services/firebase';
import { useParams } from 'react-router-dom';
import { getCurrentWalletFromLocalStorage } from '../services/localStorage';

const Profile = ({ currentWallet }: { currentWallet: string }) => {
  const { walletId } = useParams();
  const [profileInfo, setProfileInfo] = useState(null);
  const [education, setEducation] = useState(null);
  const [workHistory, setWorkHistory] = useState(null);

  useEffect(() => {
    const fetchData = async (wallet: string) => {
      const walletId =
        wallet === 'me' ? getCurrentWalletFromLocalStorage() || wallet : wallet;
      const profileInfo = await getUserByWalletId(walletId);
      setProfileInfo(profileInfo);

      const { education: educationData, workHistory: workHistoryData } =
        await getProfileFromBlockchain(walletId);
      setEducation(educationData);
      setWorkHistory(workHistoryData);
    };
    fetchData(walletId);
  }, [walletId]);

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
          <ProfileInfo data={profileInfo} isMe={walletId === 'me'} />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography>Loading...</Typography>
        </Box>
      )}
      {workHistory ? (
        <Box>
          <WorkHistoryList items={workHistory} />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography>Loading...</Typography>
        </Box>
      )}
      {education ? (
        <Box>
          <EducationList items={education} />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography>Loading...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
