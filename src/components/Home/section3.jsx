import { Box, Button, Grid, InputBase, Typography } from "@mui/material";
import React from "react";


function Section3() {
  return (
    <div className='root2'>
    <Grid container spacing={2} display={"flex"} alignItems={"center"}>
      <Grid item xs={12} sm={12} md={6}>
        <Box><img src="../../section3.png" width="100%" alt="" /></Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6} className='section3_det'>

        <Typography style={{border:"3px solid #FFCC00",width:"180px" ,borderRadius:"12px"}}></Typography>
        <Typography  className='section2_det'>Helping college students all over the world</Typography>
        <Typography  className='section2_det21'>Staybusy is the long awaited answer to working students who support themselves through college. We know how hard stydying ca be and we know no one should have to couple that stress with cash hunting. So, we’re here to help lighten the load as best we can.</Typography>
        <Button href=" /register" className='button_enroll1' variant="contained">Sign up</Button>
      </Grid>
    </Grid>
  </div>
  )
}

export default Section3
