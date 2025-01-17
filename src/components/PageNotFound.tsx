import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  console.log('NOT FOUND');
  const onClick = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        marginTop: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
      }}>
      <Typography>404 Page not found</Typography>
      <Button onClick={onClick}>Home page</Button>
    </Box>
  );
};

export default PageNotFound;
