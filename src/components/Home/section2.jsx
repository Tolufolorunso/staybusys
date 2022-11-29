import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import Brightness1Icon from '@mui/icons-material/Brightness1';

function Section2() {
  return (
    <div className='root2' style={{marginBottom:"100px"}}>
        <Grid container spacing={2}  display={"flex"} alignItems={"center"}>
            
            <Grid item xs={12} sm={12} md={12} lg={6} className="section2_dets">
            <Typography className="staybusyBuilt">Staybusy is built for you.</Typography>
            <Typography className='section2_det'>The perfect tasks based on your interests and availability</Typography>
            <Typography className='section2_det21'>Here’s how it works...</Typography>
            <Box style={{display:"flex",marginTop:"25px",marginLeft:"20px"}}>
                <Brightness1Icon style={{color:"#fff", width:"8px",marginRight:"9px"}}/>
                <Typography className='section2_det22'>Create a free account by signing up with your student email and choosing a password. </Typography>
            </Box>
            <Box style={{display:"flex",marginTop:"25px",marginLeft:"20px"}}>
                <Brightness1Icon style={{color:"#fff", width:"8px",marginRight:"9px"}}/>
                <Typography className='section2_det22'>once your email has been verified, you can continue setting up your account. Update your personal details, work availability, prefferred currency, and upload a profile picture. </Typography>
            </Box>
            <Box style={{display:"flex",marginTop:"25px",marginLeft:"20px",marginBottom:"40px"}}>
                <Brightness1Icon style={{color:"#fff", width:"8px",marginRight:"9px"}}/>
                <Typography className='section2_det22'>Once all that is done, you can now access your dashboard, where you’ll be able to access available tasks and start earning.</Typography>
            </Box>

            <Button className='button_enroll1' href=" /register" variant="contained">Join Now</Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
            <img src="../../roll.png" className='roll' alt="" />
            <Box className='rollBox'>
            
                <img src="../../section2.png" width="100%" alt="" className='section2Image' />
            
            </Box>
            </Grid>
        </Grid>
    </div>
  )
}

export default Section2
