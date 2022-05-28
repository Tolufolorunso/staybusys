import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const TotalProfit = (props) => (
  <Card {...props}>
    <CardContent >
      <Grid
        container
        spacing={3}
        
      >
         <Grid item>
         <img src='../../task3.svg' />
        </Grid>
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Amount Earned
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            13,786.98
          </Typography>
        </Grid>
       
      </Grid>
    </CardContent>
  </Card>
);
