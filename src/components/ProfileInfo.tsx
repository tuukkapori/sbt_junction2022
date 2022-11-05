import { Paper, Typography, Grid, Box, Avatar } from '@mui/material';

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
    <Paper
      sx={{
        padding: 5,
        background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
      }}>
      <Grid container>
        <Grid item xs={3}>
          <Avatar
            src={profilePicture}
            sx={{ width: 100, height: 100 }}></Avatar>
        </Grid>
        <Grid item xs={9}>
          {name && <Typography variant='h3'>{name}</Typography>}
          {bio && <Box>{bio}</Box>}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileInfo;
