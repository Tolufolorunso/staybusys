import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import Brightness1Icon from '@mui/icons-material/Brightness1';

function Section2() {
  return (
    <div className='root2'>
        <Grid container spacing={2}  display={"flex"} alignItems={"center"}>
            <Grid item xs={12} sm={12} md={12} lg={6} >
            <Typography style={{border:"3px solid #FFCC00",width:"123px" ,borderRadius:"12px"}}></Typography>
            <Typography className='section2_det'>The perfect tasks based on your interests and availability</Typography>
            <Typography className='section2_det21'>Staybusy is built for you. Here’s how it works...</Typography>
            <Box style={{display:"flex",marginTop:"25px",marginLeft:"20px"}}>
                <Brightness1Icon style={{color:"rgba(255, 204, 0, 1)", width:"8px",marginRight:"9px"}}/>
                <Typography className='section2_det22'>Create a free account by signing up with your student email and choosing a password. </Typography>
            </Box>
            <Box style={{display:"flex",marginTop:"25px",marginLeft:"20px"}}>
                <Brightness1Icon style={{color:"rgba(255, 204, 0, 1)", width:"8px",marginRight:"9px"}}/>
                <Typography className='section2_det22'>once your email has been verified, you can continue setting up your account. Update your personal details, work availability, prefferred currency, and upload a profile picture. </Typography>
            </Box>
            <Box style={{display:"flex",marginTop:"25px",marginLeft:"20px",marginBottom:"40px"}}>
                <Brightness1Icon style={{color:"rgba(255, 204, 0, 1)", width:"8px",marginRight:"9px"}}/>
                <Typography className='section2_det22'>Once all that is done, you can now access your dashboard, where you’ll be able to access available tasks and start earning.</Typography>
            </Box>

            <Button className='button_enroll1' variant="contained">Sign Up</Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box><img src="../../section2.png" width="100%" alt="" className='section2Image' /></Box>
            </Grid>
        </Grid>
    </div>
  )
}

export default Section2