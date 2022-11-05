import { Box, Typography, Avatar, Card } from '@mui/material';
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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';

const RenderCertificate = ({ certificate }: { certificate: Certificate }) => {
  const { title, issuerName, description, startDate, endDate } = certificate;
  return (
    <Card
      sx={{
        borderRadius: '20px',
        padding: '18px',
        paddingLeft: '30px',
        marginBottom: 2,
        boxShadow: '2px 2px 5px 5px rbga(255, 255, 255, 1)',
        background: 'rgba(255, 255, 255, 0.1)',
        maxWidth: '400px',
      }}>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        {/*  <LightbulbIcon /> */}
        <h3 style={{ margin: 1, paddingLeft: 2, textDecoration: 'underline' }}>
          {title}
        </h3>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        <AccountBalanceIcon sx={{ marginTop: 0.8 }} />
        <h4 style={{ margin: '5px 0px' }}>{issuerName}</h4>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        <AssignmentIcon sx={{ marginTop: 0.8 }} />
        <p style={{ margin: '5px 0px' }}>{description}</p>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        <DateRangeIcon sx={{ marginTop: 0.8 }} />
        <p style={{ margin: '5px 0px' }}>{`${startDate} - ${endDate}`}</p>
      </Box>
    </Card>
  );
};

const Profile = ({ currentWallet }: { currentWallet: string }) => {
  const { walletId } = useParams();
  const [profileInfo, setProfileInfo] = useState(null);
  const [education, setEducation] = useState(null);
  const [workHistory, setWorkHistory] = useState(null);
  const [uris, setUris] = useState<string[]>([]);
  const [issuedCertificates, setIssuedCertificates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async (wallet: string) => {
      try {
        console.log('fetching data');
        setLoading(true);
        const walletId =
          wallet === 'me'
            ? getCurrentWalletFromLocalStorage() || wallet
            : wallet;
        console.log('getting user by wallet id', walletId);
        const prof = await getUserByWalletId(walletId);
        setProfileInfo(prof);
        console.log('set profile info');
        const certs = await getProfileFromBlockchain(walletId);
        setCertificates(certs);

        const uris = await getCertificateURIs(walletId);
        // const data = await getCerticatesByIds(uris);
        const data = await getCerticatesByIds(['URIXXXXXXXXXXXXX']);
        setEducation(data.filter(c => c.type === 'education'));
        setWorkHistory(data.filter(c => c.type === 'work'));

        const issuedUris: any = await getIssuedCertificateURIs(walletId);
        const issuedData = await getCerticatesByIds(['URIXXXXXXXXXXXXX']);
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
  }, []);

  console.log('work ', workHistory);

  const groupededCertificates: { [key: string]: Certificate[] } =
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
