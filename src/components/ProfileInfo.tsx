import { Paper, Typography, Grid } from '@mui/material';
import ConnectButton from './ConnectButton';

export interface ProfileInfoType {
  name: string;
  bio: string;
}

const ProfileInfo = ({ data }: { data: ProfileInfoType }) => {
  const { name, bio } = data;
  return (
    <Paper elevation={3} sx={{ padding: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {name ? (
            <Typography variant='h4'>{name}</Typography>
          ) : (
            <Typography variant='h4'>Name missing</Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          {bio ? <div>{bio}</div> : <div>Bio missing</div>}
        </Grid>
        <Grid item xs={6}>
          <ConnectButton />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileInfo;
