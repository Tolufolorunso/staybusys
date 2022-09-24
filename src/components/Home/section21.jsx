import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import Brightness1Icon from '@mui/icons-material/Brightness1';

function Section21() {
  return (
    <div className='root2' style={{marginBottom:"100px"}}>
        <Grid container spacing={2}  display={"flex"} alignItems={"center"}>
            <Grid item xs={12} sm={12} md={12} lg={6} className="section2_dets">
            <Typography className="staybusyBuilt">Staybusy is built for you.</Typography>
            <Typography className='section2_det_3'>Helping college students all over the world</Typography>
            <Typography  className='section2_det21'>Staybusy is the long awaited answer to working students who support themselves through college. We know how hard stydying ca be and we know no one should have to couple that stress with cash hunting. So, we’re here to help lighten the load as best we can.</Typography>

            <Button className='button_enroll1' href=" /register" variant="contained">Join Now</Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box><img src="../../Members.png" width="-webkit-fill-available" alt="" className='section2Image' /></Box>
            </Grid>
        </Grid>
    </div>
  )
}

export default Section21
