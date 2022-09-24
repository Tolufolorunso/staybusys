import { Box, Button, Grid, InputBase, Typography } from "@mui/material";
import React from "react";


function Section7() {
  return (
    <div className='root2 root9' style={{margin:"80px auto"}}>
    <Grid container spacing={2} display={"flex"} alignItems={"center"}>
      <Grid item xs={12} sm={12} md={6}>
        <Box><img src="../../laptopgirl.png" width="100%" alt="" className="imageSections"/></Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6} className='section3_det'>

      <Typography className="staybusyBuilt">Staybusy is built for you.</Typography>
        <Typography  className='section2_det_2 accor'>No accommodation? No Problem</Typography>
        <Typography  className='section2_det21 accor' style={{color:"#2F2E40"}}>You don’t need to have an experience working in the UK. work with us and we can help you sort out accommodation, help you start planning for your settlement, start giving you tasks that are relevent to your field while these are going on, and much more.</Typography>
        <Button href=" /register" className='button_enroll1' variant="contained">Join Now</Button>
      </Grid>
    </Grid>
    
  </div>
  )
}

export default Section7
