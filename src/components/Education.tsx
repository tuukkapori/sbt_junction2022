import { Paper, Typography } from '@mui/material';

const Education = ({ items }: { items: any }) => {
  console.log({ items });
  return (
    <Paper sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h4">Education</Typography>
      {items &&
        items.map((item: any, index: number) => (
          <Paper key={index} sx={{ margin: 1, padding: 1 }}>
            <Typography variant="h5">{item.school}</Typography>
          </Paper>
        ))}
    </Paper>
  );
};

export default Education;
