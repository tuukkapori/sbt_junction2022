import { Grid, Typography, Box } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

export interface WorkHistoryItemType {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
}

const WorkHistoryItem = ({ item }: { item: WorkHistoryItemType }) => {
  const { companyName, position, startDate, endDate } = item;

  return (
    <Grid container sx={{ margin: 1, padding: 1 }} spacing={2}>
      <Grid item xs={2}>
        <Box m={'auto'}>
          <WorkIcon fontSize='large'></WorkIcon>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Typography variant='h5'>{companyName}</Typography>
        <div>{position}</div>
        <div>
          {startDate} - {endDate}
        </div>
      </Grid>
    </Grid>
  );
};

export default WorkHistoryItem;
