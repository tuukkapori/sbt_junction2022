import { Box, Typography, Avatar, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Certificate,
  getCertificateURIs,
  getIssuedCertificateURIs,
} from '../services/blockchain';
import { getUserByWalletId, getCerticatesByIds } from '../services/firebase';
import { useParams } from 'react-router-dom';
import { getCurrentWalletFromLocalStorage } from '../services/localStorage';
import CertificateList from './CertificateList';

const Profile = ({ currentWallet }: { currentWallet: string }) => {
  const { walletId: walletParam } = useParams();
  const walletId =
    walletParam === 'me' ? window.ethereum.selectedAddress : walletParam;
  const [profileInfo, setProfileInfo] = useState(null);
  const [education, setEducation] = useState(null);
  const [workHistory, setWorkHistory] = useState(null);
  const [uris, setUris] = useState<string[]>([]);
  const [issuedCertificates, setIssuedCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async (walletId: string) => {
      try {
        console.log('fetching data');
        setLoading(true);

        console.log('getting user by wallet id', walletId);
        const prof = await getUserByWalletId(walletId);
        setProfileInfo(prof);
        console.log('set profile info');
        // const certs = await getProfileFromBlockchain(walletId);
        // setCertificates(certs);

        const uris = await getCertificateURIs(walletId);
        console.log({ uris });
        // const data = await getCerticatesByIds(uris);
        const data = await getCerticatesByIds(uris);
        console.log({ data });
        setCertificates(data);
        // setEducation(data.filter(c => c.type === 'education'));
        // setWorkHistory(data.filter(c => c.type === 'work'));

        const issuedUris: any = await getIssuedCertificateURIs(walletId);
        const issuedData = await getCerticatesByIds(issuedUris);
        setIssuedCertificates(issuedData);

        // setIssuedCertificates(data.filter(c => c.type === 'education'))

        console.log({ uris });
        setUris(issuedUris);
        setLoading(false);
      } catch (error) {
        console.log('error in fetchdata function ', error);
      }
    };
    fetchData(walletId);
  }, [walletParam]);

  console.log({ issuedCertificates });

  const groupedCertificates: { [key: string]: Certificate[] } =
    certificates.length
      ? certificates.reduce((obj, cert: Certificate) => {
          const { type } = cert;
          if (obj[type]) {
            obj[type].push(cert);
          } else {
            obj[type] = [cert];
          }
          return obj;
        }, {})
      : {};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Box sx={{ p: 3 }}>
        {walletParam === 'me' && <h4>My profile</h4>}
        {profileInfo && (
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
            <Typography variant='h4'>{profileInfo.name}</Typography>
            <Typography variant='subtitle1'>{walletId}</Typography>
            <Typography variant='subtitle2'>{profileInfo.bio}</Typography>
          </Box>
        )}

        <Box sx={{ mt: 5 }}>
          <h3>Certificates</h3>
          <hr />
          {certificates.length > 0 &&
            Object.keys(groupedCertificates).map(
              (key: string, index: number) => {
                const certsOnCategory = groupedCertificates[key];
                let title = key;

                switch (key) {
                  case 'work':
                    title = 'Experience';
                    break;
                  case 'education':
                    title = 'Education';
                    break;
                  default:
                    title = 'Miscellaneous';
                }

                return (
                  <Box key={index}>
                    {certsOnCategory.length > 0 && (
                      <CertificateList title={title} items={certsOnCategory} />
                    )}
                  </Box>
                );
              }
            )}
          {issuedCertificates.length > 0 && (
            <CertificateList
              title={'Issued Certificates'}
              items={issuedCertificates}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
