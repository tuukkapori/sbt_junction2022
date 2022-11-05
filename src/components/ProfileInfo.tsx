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
    <Paper
      sx={{
        padding: 5,
        background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
      }}>
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
      </Grid>
    </Paper>
  );
};

export default ProfileInfo;
