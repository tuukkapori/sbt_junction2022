import { Box, Card, Tooltip, Button, Typography } from '@mui/material';
import { Certificate, revokeCertificate } from '../services/blockchain';
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
    tokenId,
  } = certificate;
  const navigate = useNavigate();
  const deleteCertificate = async () => {
    await revokeCertificate(tokenId);
  };

  return (
    <Card
      sx={{
        borderRadius: '20px',
        padding: '18px',
        paddingLeft: '40px',
        marginBottom: 2,
        boxShadow: '2px 2px 5px 5px rbga(255, 255, 255, 1)',
        background: 'rgba(255, 255, 255, 0.1)',
        maxWidth: '450px',
        minWidth: '450px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        {/*  <LightbulbIcon /> */}
        <Typography
          variant='h5'
          style={{
            margin: 1,
            marginBottom: '5px',
          }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        <AccountBalanceIcon sx={{ marginTop: 0.8 }} />
        <Tooltip title='View issuer profile'>
          <Typography
            variant='subtitle1'
            style={{
              margin: '5px 0px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => navigate(`/profiles/${issuerAddress}`)}>
            {issuerName}
          </Typography>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        <AssignmentIcon sx={{ marginTop: 0.8 }} />
        <Typography variant='subtitle1' style={{ margin: '5px 0px' }}>
          {description}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        <DateRangeIcon sx={{ marginTop: 0.8 }} />
        <Typography
          variant='subtitle1'
          style={{
            margin: '5px 0px',
          }}>{`${startDate} – ${endDate}`}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        <LinkIcon sx={{ marginTop: 0.8 }} />
        <Tooltip title='Open transaction on block explorer'>
          <Typography variant='subtitle1' sx={{ marginTop: 0.6 }}>
            <a
              style={{ margin: '20px 0px', color: 'white' }}
              href={`https://testnet.bscscan.com/tx/${transactionHash}`}
              target='_blank'>
              View transaction
            </a>
          </Typography>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default RenderCertificate;
