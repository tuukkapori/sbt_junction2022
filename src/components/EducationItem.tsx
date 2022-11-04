import { Paper, Typography } from '@mui/material';

export interface EducationItemType {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

const EducationItem = ({ item }: { item: EducationItemType }) => {
  const { school, degree, startDate, endDate } = item;

  return (
    <Paper sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h5">{school}</Typography>
      <div>{degree}</div>
      <div>{startDate}</div>
      <div>{endDate}</div>
    </Paper>
  );
};

export default EducationItem;
