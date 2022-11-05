import { Button } from '@mui/material';

const ConnectButton = () => {
  const onClick = () => {
    console.log('Friend request sent!');
  };

  return (
    <Button onClick={onClick} variant='outlined' sx={{ margin: 'auto' }}>
      Connect
    </Button>
  );
};

export default ConnectButton;
