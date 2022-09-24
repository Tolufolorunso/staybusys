import { Box, Button, Divider, Grid, InputBase, Typography } from "@mui/material";
import React from "react";

function Section8() {
  return (
    <div className="root2">
      <Grid container spacing={2} display={"flex"} alignItems={"center"}>
        <Grid item xs={12} sm={12} md={5}>
          <Box>
            <Typography className="staybusyBuilt">Staybusy is built for you.</Typography>
            <Typography className="section2_det_2 accor section8">
              Let's take a look at things you have on your mind.
            </Typography>

            <img src="./Section8.png" width="100%" alt="" className="imageSections" style={{paddingTop:"40px"}} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={7} className="section3_det">
          <Typography className="section2_det21 accor section8" style={{ color: "#2F2E40" }}>
          <b>01. How can i join StayBusy</b>
          </Typography>
          <Typography className="section2_det21 accor section8" style={{ color: "#2F2E40",fontWeight:200, }}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </Typography>
          <Divider style={{color:"#E4E4E7"}} />
          <Typography className="section2_det21 accor section8" style={{ color: "#2F2E40" }}>
          <b>02. Is StayBusy really free?</b>
          </Typography>
          <Typography className="section2_det21 accor section8" style={{ color: "#2F2E40",fontWeight:200, }}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </Typography>
          <Divider style={{color:"#E4E4E7"}} />
          
          <Typography className="section2_det21 accor section8" style={{ color: "#2F2E40" }}>
          <b>03. How many currencies can students earn in?</b>
          </Typography>
          <Typography className="section2_det21 accor section8" style={{ color: "#2F2E40",fontWeight:200, }}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </Typography>
          <Divider style={{color:"#E4E4E7"}} />
          <Typography className="section2_det21 accor section8" style={{ color: "#2F2E40" }}>
          <b>04. Can I open multiple accounts?</b>
          </Typography>
          <Typography className="section2_det21 accor section8 " style={{ color: "#2F2E40",fontWeight:200, }}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </Typography>
          <Divider style={{color:"#E4E4E7"}} />
          
          
          <Button href=" /register" className="button_enroll1" variant="contained">
          Read More FAQs
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Section8;
