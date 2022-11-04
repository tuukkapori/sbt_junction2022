import { Paper } from '@mui/material';
import Education from './Education';
import WorkHistory from './WorkHistory';
import Connect from './Connect';

const Profile = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <div>
      <Paper elevation={3} sx={{ padding: 5 }}>
        <div>{name}</div>
        <div>{description}</div>
        <Connect />
      </Paper>
      <Education />
      <WorkHistory />
    </div>
  );
};

export default Profile;
