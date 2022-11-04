import { Paper, Typography } from '@mui/material';

export interface EducationItemType {
  school: string;
  startDate: string;
}

const EducationItem = ({ item }: { item: EducationItemType }) => {
  const { school, startDate } = item;

  return (
    <Paper sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h5">{school}</Typography>
    </Paper>
  );
};

export default EducationItem;
