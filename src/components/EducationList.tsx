import { Paper, Typography } from '@mui/material';
import EducationItem, { EducationItemType } from './EducationItem';



const Education = ({ items }: { items: any }) => {
  return (
    <Paper sx={{ padding: 5 }}>
      <Typography variant='h4'>Education</Typography>
      {items &&
        items.map((item: EducationItemType, index: number) => (
          <EducationItem key={index} item={item} />
        ))}
    </Paper>
  );
};

export default Education;
