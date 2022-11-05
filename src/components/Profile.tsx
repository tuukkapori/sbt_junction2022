import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EducationList from './EducationList';
import WorkHistoryList from './WorkHistoryList';
import ProfileInfo from './ProfileInfo';

import {
  getProfileFromBlockchain,
  getProfileFromFirebase,
} from '../services/profileInfo';
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
      const profileInfo = await getProfileFromFirebase(walletId);
      setProfileInfo(profileInfo);

      const { education: educationData, workHistory: workHistoryData } =
        await getProfileFromBlockchain(walletId);
      setEducation(educationData);
      setWorkHistory(workHistoryData);
    };
    fetchData(walletId);
  }, [walletId]);

  return (
    <div>
      {profileInfo ? <ProfileInfo data={profileInfo} /> : <div>Loading...</div>}
      {education ? <EducationList items={education} /> : <div>Loading...</div>}
      {workHistory ? (
        <WorkHistoryList items={workHistory} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
