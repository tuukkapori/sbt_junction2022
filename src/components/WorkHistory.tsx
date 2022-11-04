import { Paper, Typography } from '@mui/material';

const WorkHistory = ({ items }: { items: any }) => {
  console.log({ items });
  return (
    <Paper sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h4">Work History</Typography>
      {items &&
        items.map((item: any, index: number) => (
          <Paper key={index} sx={{ margin: 1, padding: 1 }}>
            <Typography variant="h5">{item.companyName}</Typography>
          </Paper>
        ))}
    </Paper>
  );
};

export default WorkHistory;
