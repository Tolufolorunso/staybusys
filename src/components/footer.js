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
                  href="https://twitter.com/messages/compose?recipient_id=912242018620932098&text=Hello"
                  target="_blank"
                >
                  <p target="_blank" className="footer-text" >Support</p>
                </Link>
                </div>

      </Box>
    </div>
  );
}

export default Footer;
