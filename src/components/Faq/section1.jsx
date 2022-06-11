import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'

import Section2 from './section2'
import TwitterIcon from "@mui/icons-material/Twitter";
function Section1() {
  return (
    <div className='root'>
        <Box className='faqTitle'>
            <Typography className='section2Det'>
            Frequently Asked Questions
            </Typography>
            <img src="../../faqbee.svg" width='50px' className='faqBee' alt="" />
        </Box>
        <Box display={'flex'} className='faqMain' style={{marginBottom:"100px"}}>
            <Box className='faqBox2'>
            <img src="../../faq2.png" width="70px" className='bees21' alt="" />

            <Typography className='faqText'>Got more questions?</Typography>
            <div style={{display:"flex",justifyContent:"center",width:"100%",paddingBottom:"7px"}} >  <Button  href="https://twitter.com/intent/tweet?screen_name=staybusyio" target="_blank" className='faqButton' variant='contained'>  <TwitterIcon style={{ color: "white",fontSize:"36px", paddingRight: "7px" }} />{" "}
          <Typography className='faqButtonText'>Tweet at us</Typography></Button></div>
          <Typography className='faqDetails'>
          We will respond to tweets as soon as possible
          </Typography>
          <img src="../../faq.png" width="40px" className='bees' alt="" />

            </Box>
            <Box>
                <Section2 />
            </Box>
        </Box>
    </div>
  )
}

export default Section1
