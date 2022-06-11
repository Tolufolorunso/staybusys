// IMPORTING APIS
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  Box,
  useScrollTrigger,
  Slide,
  Menu,
  MenuItem,

  Divider
} from "@mui/material";
import CallMadeIcon from '@mui/icons-material/CallMade';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuIcon from '@mui/icons-material/Menu';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { padding } from "@mui/system";
import Link from "next/link";
// IMPORTING ICONS

// REACT APP IMPORTS


// LOCAL-STYLING




function Navbar() {
  const isMobile = useMediaQuery('(max-width:800px)');
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>


      <AppBar style={{ background: "transparent", boxShadow:' 0px 1px 0px #EDEDF2',position:"inherit" ,borderBottom:"1px solid rgba(47, 46, 64, 0.44);",width:"90%",margin:"auto", margin:"10px auto"}}>
        <div style={{ width: "100%", margin: "auto" }}>
          <Toolbar>


            {isMobile ? (
              <>
                <Box style={{ display: "flex", justifyContent: 'space-between', width: '100%' }}>

                <Button disableRipple href="/" style={{border:"none",backgroundColor:"none",background:"transparent"}}><img src="./logo.svg" alt="" width="150px" />
                </Button>


                  <IconButton
                    style={{ color: "#1C1C1C" }}
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >

                               <Link href='/faq' style={{textDecoration:"none"}}>
                               <MenuItem style={{ textTransform: "none !important", fontFamily: "Euclid Circular A",color:"#1C1C1C",fontSize:"16px"  }} onClick={handleClose}>FAQs</MenuItem>
                               </Link>
                               <Link  href="https://twitter.com/messages/compose?recipient_id=912242018620932098&text=Hello" target='_blank' style={{textDecoration:"none"}}>
                               <MenuItem style={{ textTransform: "none !important", fontFamily: "Euclid Circular A",color:"#1C1C1C",fontSize:"16px"  }} href='/'onClick={handleClose}>Support</MenuItem>
                               </Link>

                               <Link href='/login' style={{textDecoration:"none"}}>
                               <MenuItem style={{ textTransform: "none !important", fontFamily: "Euclid Circular A",color:"#1C1C1C",fontSize:"16px"  }} onClick={handleClose}>Login</MenuItem>
                               </Link>
                               <Button className='button_enroll1' href="/register" variant="contained">Sign Up</Button>

                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>

                </Box>
              </>
            ) : (
              <div style={{ marginRight: "2rem", color: '#fff', display: 'flex', width: "100%", justifyContent: "space-between", margin:"20px 0" }}>
                <Button disableRipple href="/"  style={{border:"none",backgroundColor:"none",background:"transparent"}}><img src="./logo.svg" alt=""  />
                </Button>

                <Box style={{ float: 'center', display: 'flex' }}>
                <Button
                    variant="text"
                    className='buttons1'
                    href="/faq"
                    style={{ marginRight: "2rem", color: '#1C1C1C',textTransform:"none",fontSize:"16px",fontFamily:"Euclid Circular A",fontWeight:"normal" }}
                  >
                    {/* */}
                    FAQs
                  </Button>
                  <Button
                    variant="text"
                    disableRipple
                    className='buttons1'
                    href="https://twitter.com/messages/compose?recipient_id=912242018620932098&text=Hello"
                    target="_blank"
                    style={{ marginRight: "2rem", color: '#1C1C1C',textTransform:"none",fontSize:"16px",fontFamily:"Euclid Circular A",fontWeight:"normal" }}
                  >
                    {/* */}
                    Support
                  </Button>
                  <Button
                    variant="text"
                    href='/login'
                    className='buttons1'
                  disableRipple
                    style={{ marginRight: "2rem", color: '#1C1C1C',textTransform:"none",fontSize:"16px",fontFamily:"Euclid Circular A",fontWeight:"normal" }}
                  >
                    {/* */}
                    Login
                  </Button>

                  <Button className='button_enroll1' href="/register"  variant="contained">Sign Up</Button>
                </Box>


              </div>
            )}
          </Toolbar>
        </div>

      </AppBar>
      {/* <Divider /> */}


    </div>
  );
};

export default Navbar;
