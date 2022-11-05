import { Box, Typography, Avatar, Card } from '@mui/material';
import RenderCertificate from './RenderCertificate';

const CertificateList = ({ title, items }: { title: string; items: any }) => {
  return (
    <Box mt={4}>
      <Typography variant='h4' sx={{ marginBottom: 2 }}>
        {title}
      </Typography>

      {items.map((cert: any, index: number) => {
        return <RenderCertificate certificate={cert} key={index} />;
      })}
    </Box>
  );
};

export default CertificateList;
