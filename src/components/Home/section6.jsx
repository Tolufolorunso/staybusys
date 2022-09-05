import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DoneIcon from '@mui/icons-material/Done';

export default function section6() {
  return (
    <div className="root2">
      <div className="sectionParent">
        <Grid container spacing={5}>
    
            <Grid item xs={12} sm={12} md={6}>
              <Typography className="staybusyBuilt">Staybusy is built for you.</Typography>
              <Typography className="section2_det_3 jack">
              We’re not a jack of all trades. We have our focus areas.
              </Typography>
              <Grid container spacing={4}>
              <Grid item>
              <Button className='button_enroll1' href=" /register" variant="contained">Get Started</Button>
              </Grid>
              <Grid item >
              <Button className='button_enroll_home' href=" /register" variant="outlined">Learn More</Button>
           
              </Grid>
              </Grid>
            </Grid>
         
            <Grid item xs={12} sm={12} md={6}>
<div className="section6Box">
            <Box style={{display:"flex",marginTop:"5px",marginLeft:"20px",marginBottom:"20px"}}>
                <DoneIcon style={{color:"#FFCC00", width:"18px",marginRight:"9px"}}/>
                <Typography className='section2_det22'>IT (Product Design, Web Development</Typography>
            </Box>
            <Box style={{display:"flex",marginTop:"5px",marginLeft:"20px",marginBottom:"20px"}}>
                <DoneIcon style={{color:"#FFCC00", width:"18px",marginRight:"9px"}}/>
                <Typography className='section2_det22'>Social Media Management</Typography>
            </Box>
            <Box style={{display:"flex",marginTop:"5px",marginLeft:"20px",marginBottom:"20px"}}>
                <DoneIcon style={{color:"#FFCC00", width:"18px",marginRight:"9px"}}/>
                <Typography className='section2_det22'>Content Creation</Typography>
            </Box>
            <Box style={{display:"flex",marginTop:"5px",marginLeft:"20px",marginBottom:"20px"}}>
                <DoneIcon style={{color:"#FFCC00", width:"18px",marginRight:"9px"}}/>
                <Typography className='section2_det22'>Marketing (SEO, SEM, ADs)</Typography>
            </Box>
            <Box style={{display:"flex",marginTop:"5px",marginLeft:"20px",marginBottom:"15px"}}>
                <DoneIcon style={{color:"#FFCC00", width:"18px",marginRight:"9px"}}/>
                <Typography className='section2_det22'>Payroll and Accounting</Typography>
            </Box>
            </div>
            </Grid>
         
        </Grid>
      </div>
    </div>
  );
}
