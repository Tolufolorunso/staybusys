import { Box, Divider } from "@mui/material";
import React from "react";
import { useMediaQuery } from '@mui/material';
import Link from "next/link";


function Footer() {
  let year = new Date().getFullYear();
  const mobile2 =  useMediaQuery('(min-width:600px)')
  return (
    <div className='roots'>

      <Box className='footerBoxmain' display={"flex"} justifyContent={"space-between"} style={{paddingTop:"20px"}}>
      <div className="logo">

            <img src="./logo.svg" alt=""  />
          </div>


           <div  className='footerFoot' style={{display:"flex"}}> <Link
                  className="footer-text"
                  style={{ textDecoration: "none" ,marginRight:"15px" }}
                  href="/faq"
                >
            <p className="footer-text">
         FAQs
            </p>
            </Link>
            <Link
                  className="footer-text"
                  style={{ textDecoration: "none" }}
                  href="wwww.twitter.com"
                  target="_blank"
                >
                  <p className="footer-text" >Support</p>
                </Link>
                </div>

      </Box>
    </div>
  );
}

export default Footer;
