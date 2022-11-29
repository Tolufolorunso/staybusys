import { Box, Button, Grid, Typography } from '@mui/material'
import { textAlign } from '@mui/system'
import React from 'react'

export default function Section4() {
  return (
    <Box className='root4'>
        {/* <img src="../../bee1.png" className='bee' alt="" />
        */}
        <Box style={{textAlign:"center"}}>
           
            <Typography className="staybusyBuilt">Staybusy is built for you.</Typography>
            <Typography className='section2_det4'>Let’s see how it works</Typography>
            <Typography className='section2_det41'>Staybusy has been built to fit easily into your student lifestyle</Typography>
              </Box>
            <Grid container spacing={2} display={"flex"} className="works" alignItems={"center"}>
      <Grid item xs={12} sm={12}  md={12} lg={6}>
        <Box><img src="../../LADY1.png" width="100%" alt="" className="imageSections2"/></Box>
      </Grid>
      <Grid item xs={12} sm={12}  md={12} lg={6} className='section3_det '>

      <img src="./Icon1.svg" alt="" /> 
        <Typography  className='section2_det_5'>Sign up and get verified</Typography>
        <Typography  className='section2_det21'>Create your account on the platform, and we’ll do our due dilligence in the background to ensure your credentials check out. Once your Identity is verified, your account will be set up.</Typography>
       
      </Grid>
    </Grid>
    
    <Grid container spacing={2}  display={"flex"} className="works works2" alignItems={"center"}>
            <Grid item xs={12} sm={12} md={12} lg={6} className="section2_dets">
            <img src="./Icon2.svg" alt="" /> 
        <Typography  className='section2_det_5'>Complete Assigned Tasks</Typography>
        <Typography  className='section2_det21'>Once your account has been set up you’lll be able to receive tasks. Complete yoir assigned tasks as they’re allocated to you so you can start earning.</Typography>
       
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box><img src="../../lady2.png" width="100%" alt="" className='section2Image2' /></Box>
            </Grid>
        </Grid>
        <Grid container spacing={2} display={"flex"}  style={{marginTop:"100px"}}  className="works" alignItems={"center"}>
      <Grid item xs={12} sm={12}  md={12} lg={6}>
        <Box><img src="../../lady3.png" width="100%" alt="" className="imageSections2"/></Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} className='section3_det '>

      <img src="./Icon3.svg" alt="" /> 
        <Typography  className='section2_det_5'>Get paid upon completion</Typography>
        <Typography  className='section2_det21'>Upon the completion of each task, your payment wi;; reflect on your StayBusy dashboard. complete more tasks and see your earnings accumulate. you can decide to withdraw your earnings from staybusy anytime you want or keep them accumulating as long as you wish.</Typography>
       
      </Grid>
    </Grid>
    </Box>
  )
}
