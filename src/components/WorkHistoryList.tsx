import { Paper, Typography } from '@mui/material';
import WorkHistoryItem, { WorkHistoryItemType } from './WorkHistoryItem';

const WorkHistory = ({ items }: { items: any }) => {
  return (
    <Paper sx={{ padding: 5 }}>
      <Typography variant='h4'>Experience</Typography>
      {items &&
        items.map((item: WorkHistoryItemType, index: number) => (
          <WorkHistoryItem key={index} item={item} />
        ))}
    </Paper>
  );
};

export default WorkHistory;
