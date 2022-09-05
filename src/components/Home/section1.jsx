import { Button, InputBase, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function section1() {
    // const [value, setValue] = React.useState("");
  return (
    <div className='roothome homepage'style={{textAlign:"center",}}>
        <img src="./starhome.svg"  alt="" />
        <Typography className='header'>Easily Connecting <span style={{color:"#FF6685",}}>College Students </span>  with Paying Tasks</Typography>
        <Typography className='homepageDetails'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat.</Typography>
        <form className='form' noValidate autoComplete="off">
                  <Box className="homeForm" style={{ position: "relative" }}>
                    <InputBase
                      type="email"
                      className='textField'
                      variant="outlined"
                      // value={value}
                      // onChange={(e, value) => setValue(value)}
                      placeholder="Enter your student email"
                    />
                    <Button href=" /register" className='button_enroll'variant="contained">Register</Button>
                  </Box>
                </form>
        </div>
  )
}
