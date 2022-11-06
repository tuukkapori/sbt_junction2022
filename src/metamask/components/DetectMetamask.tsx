import { Button, Typography } from '@mui/material';
import { ConnectMetamask } from '../';

export default function DetectMetamask(props: any) {
  if (!window.ethereum) {
    return (
      <Typography variant='subtitle1' sx={{ color: '#f77f00', marginTop: 1 }}>
        Metamask is not installed in this browser.{' '}
        <a
          href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'
          target='_blank'
          rel='noopener noreferrer'>
          Download it here.
        </a>
      </Typography>
    );
  } else {
    return (
      <Button
        variant='contained'
        size='large'
        sx={{ fontWeight: 600, marginTop: 3 }}
        onClick={props.handleConnectMetamask}>
        Connect Metamask
      </Button>
    );
  }
}
