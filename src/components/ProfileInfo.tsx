import { Paper, Typography, Grid, Box, Avatar } from '@mui/material';
import ConnectButton from './ConnectButton';

export interface ProfileInfoType {
  name: string;
  bio: string;
  profilePicture: string;
}

const ProfileInfo = ({
  data,
  isMe,
}: {
  data: ProfileInfoType;
  isMe: Boolean;
}) => {
  const { name, bio, profilePicture } = data;
  return (
    <Paper sx={{ padding: 5 }}>
      <Grid container>
        <Grid item xs={3}>
          <Avatar
            src={profilePicture}
            sx={{ width: 100, height: 100 }}></Avatar>
        </Grid>
        <Grid item xs={9}>
          {name ? (
            <Typography variant='h4'>{name}</Typography>
          ) : (
            <Typography variant='h4'>Name missing</Typography>
          )}
          {bio ? <Box>{bio}</Box> : <Box>Bio missing</Box>}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileInfo;
