import { Button } from '@mui/material';

const ConnectButton = () => {
  const onClick = () => {
    console.log('Friend request sent!');
  };

  return <Button onClick={onClick}>Connect</Button>;
};

export default ConnectButton;
