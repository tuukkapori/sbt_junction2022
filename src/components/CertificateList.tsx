import { Box, Typography, Avatar, Card } from '@mui/material';
import RenderCertificate from './RenderCertificate';

const CertificateList = ({ title, items }: { title: string; items: any }) => {
  return (
    <Box>
      <h3>{title}</h3>
      {items.map((cert: any, index: number) => {
        return <RenderCertificate certificate={cert} key={index} />;
      })}
    </Box>
  );
};

export default CertificateList;
