import { Grid, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

export interface WorkHistoryItemType {
  companyName: string;
  startDate: string;
}

const WorkHistoryItem = ({ item }: { item: WorkHistoryItemType }) => {
  const { companyName, startDate } = item;

  return (
    <Grid container sx={{ margin: 1, padding: 1 }} spacing={2}>
      <Grid item xs={2}>
        <WorkIcon fontSize='large'></WorkIcon>
      </Grid>
      <Grid item xs={8}>
        <Typography variant='h5'>{companyName}</Typography>
        <div>{startDate}</div>
      </Grid>
    </Grid>
  );
};

export default WorkHistoryItem;
