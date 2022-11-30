import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const TotalCustomers = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
      
      >
        <Grid item>
          <img src="../../task1.svg" />
        </Grid>
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Tasks Completed
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.totalCompleted}
          </Typography>
        </Grid>
        
      </Grid>
     
    </CardContent>
  </Card>
);
