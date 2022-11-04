import { Button } from '@mui/material';

const Connect = () => {
  const onClick = () => {
    console.log('Friend request sent!');
  };

  return <Button onClick={onClick}>Connect</Button>;
};

export default Connect;
