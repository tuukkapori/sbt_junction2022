import { Box, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import EducationList from './EducationList';
import WorkHistoryList from './WorkHistoryList';
import ProfileInfo from './ProfileInfo';

import {
  getProfileFromBlockchain,
  Certificate,
  getCertificateURIs,
  getIssuedCertificateURIs,
} from '../services/blockchain';
import { getUserByWalletId, getCerticatesByIds } from '../services/firebase';
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
  // const [uris, setUris] = useState<string[]>([]);
  const [issuedCertificates, setIssuedCertificates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async (wallet: string) => {
      try {
        console.log('fetching data');
        setLoading(true);
        const walletId =
          wallet === 'me' ? window.ethereum.selectedAddress : wallet;
          
        console.log('getting user by wallet id', walletId);
        const prof = await getUserByWalletId(walletId);
        setProfileInfo(prof);
        console.log('set profile info');
        // const certs = await getProfileFromBlockchain(walletId);
        // setCertificates(certs);

        const uris: any = await getCertificateURIs(walletId);
        const data = await getCerticatesByIds(uris);
        // const data = await getCerticatesByIds(['URIXXXXXXXXXXXXX']);
        // setEducation(data.filter(c => c.type === 'education'));
        // setWorkHistory(data.filter(c => c.type === 'work'));
        console.log({ data });
        setCertificates(data);

        const issuedUris: any = await getIssuedCertificateURIs(walletId);
        const issuedData = await getCerticatesByIds(issuedUris);
        setIssuedCertificates(issuedData);

        // setIssuedCertificates(data.filter(c => c.type === 'education'))

        console.log({ uris });
        // setUris(issuedUris);
        setLoading(false);
      } catch (error) {
        console.log('error in fetchdata function ', error);
      }
    };
    fetchData(walletId);
  }, []);

  console.log('work ', workHistory);
  console.log({ issuedCertificates });

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

  console.log('work ', workHistory);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {/* {profileInfo ? (
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
