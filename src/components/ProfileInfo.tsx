import { Paper, Typography, Grid, Box } from '@mui/material';
import ConnectButton from './ConnectButton';

export interface ProfileInfoType {
  name: string;
  bio: string;
}

const ProfileInfo = ({
  data,
  isMe,
}: {
  data: ProfileInfoType;
  isMe: Boolean;
}) => {
  const { name, bio } = data;
  return (
    <Paper sx={{ padding: 5 }}>
      <Grid container>
        <Grid item xs={12}>
          {name ? (
            <Typography variant='h4'>{name}</Typography>
          ) : (
            <Typography variant='h4'>Name missing</Typography>
          )}
        </Grid>
        <Grid item xs={8}>
          {bio ? <Box>{bio}</Box> : <Box>Bio missing</Box>}
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          {!isMe && <ConnectButton />}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileInfo;
