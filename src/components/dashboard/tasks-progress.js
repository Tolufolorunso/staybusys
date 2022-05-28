import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export const TasksProgress = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
       
      >
        <Grid item>
          <img src='../../task2.svg' />
        </Grid>
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
          Tasks Rejected
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
           169
          </Typography>
        </Grid>
        
      </Grid>
     
    </CardContent>
  </Card>
);
