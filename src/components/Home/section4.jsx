import { Box, Button, Typography } from '@mui/material'
import { textAlign } from '@mui/system'
import React from 'react'

export default function Section4() {
  return (
    <Box className='root4'>
        <img src="../../bee1.png" className='bee' alt="" />
        <img src="../../bee31.png" className='bee1' alt="" />
        <Box style={{textAlign:"center"}}>
            <img src="../../star.svg"  width="85px" alt="" />
            <Typography style={{border:"3px solid #FFCC00",width:"123px", borderRadius:"12px",margin:"auto",marginTop:"20px"}}></Typography>
            <Typography className='section2_det4'> No credit card required!</Typography>
            <Typography className='section2_det41'>Yes! You do not have to pay a dime to join Staybusy. Just create a free account and task based on your settings will be sent to you, accessible via your dashboard. accept the tasks you want and decline the ones you dont. you get paid what you earned immediately your accepted tasks are submitted.</Typography>
            <Button  href=" /register" className='button_enroll1' variant="contained">Sign Up</Button>
        </Box>

    </Box>
  )
}
