import { Box, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import EducationList from './EducationList';
import WorkHistoryList from './WorkHistoryList';
import ProfileInfo from './ProfileInfo';

import {
  getProfileFromBlockchain,
  Certificate,
  getCertificateURIs,
} from '../services/blockchain';
import { getUserByWalletId } from '../services/firebase';
import { useParams } from 'react-router-dom';
import { getCurrentWalletFromLocalStorage } from '../services/localStorage';

const RenderCertificate = ({ certificate }: { certificate: Certificate }) => {
  const { title, issuerName, description, startDate, endDate } = certificate;
  return (
    <Box>
      <h5>{issuerName}</h5>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ marginRight: '25px' }}>{title}</h3>
        <p>{`${startDate} - ${endDate}`}</p>
      </Box>
      <p>{description}</p>
    </Box>
  );
};

const Profile = ({ currentWallet }: { currentWallet: string }) => {
  const { walletId } = useParams();
  const [profileInfo, setProfileInfo] = useState(null);
  const [education, setEducation] = useState(null);
  const [workHistory, setWorkHistory] = useState(null);
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async (wallet: string) => {
      const walletId =
        wallet === 'me' ? getCurrentWalletFromLocalStorage() || wallet : wallet;
      const profileInfo = await getUserByWalletId(walletId);
      setProfileInfo(profileInfo);

      const certs = await getProfileFromBlockchain(walletId);
      setCertificates(certs);

      const uris = await getCertificateURIs(walletId);

      console.log({ uris });
    };
    fetchData(walletId);
  }, [walletId]);

  console.log('work ', workHistory);

  const groupededCertificates: { [key: string]: Certificate[] } =
    certificates.length
      ? certificates.reduce((obj: any, cert: any) => {
          const { type } = cert;
          if (obj[type]) {
            obj[type].push(cert);
          } else {
            obj[type] = [cert];
          }

          return obj;
        }, {})
      : {};

  console.log('grouped ', groupededCertificates);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {/* {profileInfo ? (
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
      )} */}
      {profileInfo && (
        <Box sx={{ p: 3 }}>
          {walletId === 'me' && <h4>My profile</h4>}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={profileInfo.profilePicture}
            />
            <h1 style={{ marginBottom: 3 }}>{profileInfo.name}</h1>
            <Typography>{profileInfo.bio}</Typography>
          </Box>

          <Box sx={{ mt: 5 }}>
            <h3>Certificates</h3>
            <hr />
            {certificates.length &&
              Object.keys(groupededCertificates).map((key: string) => {
                const certsOnCategory = groupededCertificates[key];
                return (
                  <Box>
                    <h3>{key}</h3>
                    {certsOnCategory.map(cert => {
                      return <RenderCertificate certificate={cert} />;
                    })}
                  </Box>
                );
              })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
