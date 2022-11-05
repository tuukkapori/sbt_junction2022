import { Grid, Typography,Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

export interface EducationItemType {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

const EducationItem = ({ item }: { item: EducationItemType }) => {
  const { school, degree, startDate, endDate } = item;

  return (
    <Grid container sx={{ margin: 1, padding: 1 }} spacing={2}>
      <Grid item xs={2}>
        <Box m={'auto'}>
          <SchoolIcon fontSize='large'></SchoolIcon>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Typography variant='h5'>{school}</Typography>
        <div>{degree}</div>
        <div>
          {startDate} - {endDate}
        </div>
      </Grid>
    </Grid>
  );
};

export default EducationItem;
