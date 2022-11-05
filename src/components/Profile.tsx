import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EducationList from './EducationList';
import WorkHistoryList from './WorkHistoryList';
import ProfileInfo from './ProfileInfo';

import {
  getProfileFromBlockchain,
  getCertificateURIs,
  getIssuedCertificateURIs,
} from '../services/blockchain';
import { getUserByWalletId, getCerticatesByIds } from '../services/firebase';
import { useParams } from 'react-router-dom';
import { getCurrentWalletFromLocalStorage } from '../services/localStorage';

const Profile = ({ currentWallet }: { currentWallet: string }) => {
  const { walletParam } = useParams();
  const [profileInfo, setProfileInfo] = useState(null);
  const [education, setEducation] = useState(null);
  const [workHistory, setWorkHistory] = useState(null);
  const [issuedCertificates, setIssuedCertificates] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (wallet: string) => {
      setLoading(true);
      const walletId =
        wallet === 'me' ? getCurrentWalletFromLocalStorage() || wallet : wallet;
      const profileInfo = await getUserByWalletId(walletId);
      setProfileInfo(profileInfo);

      const { education: educationData, workHistory: workHistoryData } =
        await getProfileFromBlockchain(walletId);
      setEducation(educationData);
      setWorkHistory(workHistoryData);

      const uris = await getCertificateURIs(walletId);
      // const data = await getCerticatesByIds(uris);
      const data = await getCerticatesByIds(['URIXXXXXXXXXXXXX']);
      setEducation(data.filter(c => c.type === 'education'));
      setWorkHistory(data.filter(c => c.type === 'work'));

      const issuedUris = await getIssuedCertificateURIs(walletId);
      const issuedData = await getCerticatesByIds(['URIXXXXXXXXXXXXX']);
      setIssuedCertificates(issuedData);

      // setIssuedCertificates(data.filter(c => c.type === 'education'))

      console.log({ uris });
      setLoading(false);
    };
    fetchData(walletParam);
  }, [walletParam]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {profileInfo ? (
        <Box>
          <ProfileInfo data={profileInfo} isMe={walletParam === 'me'} />
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
      {workHistory && workHistory.length ? (
        <Box>
          <WorkHistoryList items={workHistory} />
        </Box>
      ) : (
        <>
          {loading && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Typography>Loading...</Typography>
            </Box>
          )}
        </>
      )}
      {education && education.length ? (
        <Box>
          <EducationList items={education} />
        </Box>
      ) : (
        <>
          {loading && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Typography>Loading...</Typography>
            </Box>
          )}
        </>
      )}
      {issuedCertificates && issuedCertificates.length ? (
        <Box>
          <EducationList items={education} />
        </Box>
      ) : (
        <>
          {loading && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Typography>Loading...</Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Profile;
