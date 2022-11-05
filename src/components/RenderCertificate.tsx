import { Box, Card } from '@mui/material';
import { Certificate } from '../services/blockchain';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
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

export default RenderCertificate;
