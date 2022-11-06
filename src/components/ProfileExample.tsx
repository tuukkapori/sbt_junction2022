import { Box, Typography, Avatar, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Certificate,
  getCertificateURIs,
  getIssuedCertificateURIs,
} from '../services/blockchain';
import {
  getUserByWalletId,
  getCerticatesByIds,
  getCertificateById,
} from '../services/firebase';
import { useParams } from 'react-router-dom';
import CertificateList from './CertificateList';
import WalletIcon from '@mui/icons-material/Wallet';

const Profile = () => {
  const ExampleVariables = {
    walletId: '0x043bff4ed01d0e78d1408e5fb26bece5ebea90f5',
    uris: [
      '4fokXb8NdjK5CDzhziAM1',
      'PhLnXooLwmzH-OZNQewvY',
      'F31KTgBIuuN-ScbDODkC_',
      'nlwVJtbvdwAqVrIjKMl__',
      '4rhtxYBBb33bytP5KcZYT',
    ],
    issuedUrisAndIds: [
      {
        uri: 'Stmz_9cm0YznKDfwW7h5G',
        id: { _hex: '0x04', _isBigNumber: true },
      },
    ],
  };

  const { walletId: walletParam } = useParams();
  const walletId = ExampleVariables.walletId;
  // walletParam === 'me' ? window.ethereum?.selectedAddress : walletParam;
  const [profileInfo, setProfileInfo] = useState(null);
  const [issuedCertificates, setIssuedCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async (walletId: string) => {
      if (!walletId) return;
      setLoading(true);

      const lowerWalletId = walletId.toLowerCase();
      const prof = await getUserByWalletId(lowerWalletId);
      setProfileInfo(prof);

      const uris = ExampleVariables.uris; // await getCertificateURIs(lowerWalletId);
      const data = await getCerticatesByIds(uris);
      setCertificates(data);

      const issuedUrisAndIds = ExampleVariables.issuedUrisAndIds; //  await getIssuedCertificateURIs(lowerWalletId);
      if (issuedUrisAndIds && issuedUrisAndIds.length > 0) {
        const issuedData = await Promise.all(
          issuedUrisAndIds.map(async n => ({
            ...(await getCertificateById(n.uri)),
            tokenId: n.id.toString(),
          }))
        );
        setIssuedCertificates(issuedData);
      }

      setLoading(false);
    };
    fetchData(walletId);
  }, [walletParam]);

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
        {walletParam === 'me' && (
          <Typography variant='h6' style={{ textAlign: 'center' }}>
            <b>My Profile</b>
          </Typography>
        )}
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
            <Typography variant='h3'>{profileInfo.name}</Typography>
            <Box sx={{ display: 'flex' }}>
              <WalletIcon sx={{ mr: 1 }} />
              <Typography variant='subtitle1'>
                <a
                  href={`https://testnet.bscscan.com/address/${walletId}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: 'inherit' }}>
                  {walletId}
                </a>
              </Typography>
            </Box>
            <Typography variant='subtitle2'>{profileInfo.bio}</Typography>
          </Box>
        )}

        <Box sx={{ mt: 5 }}>
          <Typography variant='h6' style={{ textAlign: 'center' }}>
            <b>Certificates</b>
          </Typography>
          <Divider />
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
          {certificates.length === 0 && issuedCertificates.length === 0 && (
            <>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography>Loading...</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography>No certificates yet.</Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
