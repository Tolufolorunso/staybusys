import { Box, Button, Grid, InputBase, Typography } from "@mui/material";
import React from "react";


function Section1() {
  return (
    <div className='root'>
      <Grid container spacing={2} display={"flex"} alignItems={"center"} className='section1Box'>
        <Grid item xs={12} sm={12} md={6}>
          <Box><img src="../../header1.png" className='section1Image' alt="" /></Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} className='headebox'>
          <Typography className='headDetail'>
          The study can be hard...
          </Typography>
          <Typography style={{border:"3px solid #FFCC00",width:"90px" ,borderRadius:"12px"}}></Typography>
          <Typography className='header'>Finding paying tasks as college students shouldn’t be</Typography>
          <form className='form' noValidate autoComplete="off">
                  <Box style={{ position: "relative" }}>
                    <InputBase
                      type="email"
                      className='textField'
                      variant="outlined"
                      placeholder="Enter your student email"
                    />
                    <Button className='button_enroll'variant="contained">Sign up</Button>
                  </Box>
                </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default Section1;