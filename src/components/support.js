import { Button, Typography } from '@mui/material'
import React from 'react'
import TwitterIcon from "@mui/icons-material/Twitter";
import Link from 'next/link';
export default function Supportlayout() {
  return (
    <div style={{display:"flex",flexDirection:"column",textAlign:"center", justifycontent:"center", alignItems:"center"}}>
        <img src='../../support.svg' width="100px" style={{marginBottom:"18px",marginTop:"70px"}} />
        <Typography variant="h4" style={{marginBottom:"20px"}} >
        We’re here for you 24/7
        </Typography>
        <Typography variant='caption' style={{marginBottom:"30px"}} >
        Tweet at us and we will respond as soon as possible
        </Typography>
        <div style={{display:"flex",justifyContent:"center",paddingBottom:"130px"}} >  <Button href="https://twitter.com/intent/tweet?screen_name=staybusyio" target="_blank" className="faqButton"color='secondary' variant='contained'>  <TwitterIcon style={{ color: "white",fontSize:"36px", paddingRight: "7px" }} />{" "}
          <Typography variant="caption2" >Tweet at us</Typography></Button></div>
          <Typography variant="caption">
          You can check out our <Link href='/faq' className="BO" target="_blank"><span className="BO">FAQs  </span></Link> for more help
          </Typography>
    </div>
  )
}
