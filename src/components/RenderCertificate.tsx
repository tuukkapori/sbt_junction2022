import { Box, Card, Tooltip, Button } from '@mui/material';
import { Certificate } from '../services/blockchain';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LinkIcon from '@mui/icons-material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const RenderCertificate = ({ certificate }: { certificate: Certificate }) => {
  const {
    title,
    issuerName,
    description,
    startDate,
    endDate,
    transactionHash,
    issuerAddress,
  } = certificate;
  const navigate = useNavigate();
  const deleteCertificate = async () => {
    console.log('deleting');
  };

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
        minWidth: '400px',
      }}>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        {/*  <LightbulbIcon /> */}
        <h3
          style={{
            margin: 1,
            paddingLeft: 2,
            fontSize: '23px',
            marginBottom: '5px',
          }}>
          {title}
        </h3>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        <AccountBalanceIcon sx={{ marginTop: 0.8 }} />
        <Tooltip title='View issuer profile'>
          <h4
            style={{
              margin: '5px 0px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => navigate(`/profiles/${issuerAddress}`)}>
            {issuerName}
          </h4>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        <AssignmentIcon sx={{ marginTop: 0.8 }} />
        <p style={{ margin: '5px 0px' }}>{description}</p>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        <DateRangeIcon sx={{ marginTop: 0.8 }} />
        <p style={{ margin: '5px 0px' }}>{`${startDate} - ${endDate}`}</p>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        <LinkIcon sx={{ marginTop: 0.8 }} />
        <Tooltip title='Open transaction on block explorer'>
          <a
            style={{ margin: '5px 0px', color: 'white' }}
            href={`https://testnet.bscscan.com/tx/${transactionHash}`}
            target='_blank'>
            View transaction
          </a>
        </Tooltip>
      </Box>
      {window.ethereum.selectedAddress === issuerAddress && (
        <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
          <DeleteIcon sx={{ marginTop: 0.8 }} />
          <Button sx={{ color: 'white' }} onClick={() => deleteCertificate()}>
            Delete certificate
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default RenderCertificate;
