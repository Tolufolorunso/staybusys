import { useEffect } from 'react';

import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';

import { Cog as CogIcon } from '../icons/cog';

import ForumIcon from '@mui/icons-material/Forum';

import { NavItem } from './nav-item';

import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import Link from 'next/link';
const items = [
  {
    href: '/dashboard',
    icon: (<DashboardCustomizeOutlinedIcon   style={{marginRight:"8px",fontSize:"30px"}}/>),
    title: 'Dashboard'
  },
  {
    href: '/task',
    icon: (<HistoryToggleOffIcon  style={{marginRight:"8px",fontSize:"30px"}} />),
    title: 'My Task'
  },
  {
    href: '/mytask',
    icon: (<AssignmentIcon  style={{marginRight:"8px",fontSize:"30px"}}  />),
    title: 'Task'
  },

  {
    href: '/settings',
    icon: (<CogIcon  style={{marginRight:"8px",fontSize:"30px"}}  />),
    title: 'Settings'
  },
  {
    href: '/support',
    icon: (<ForumIcon  style={{marginRight:"8px",fontSize:"30px"}} />),
    title: 'Support'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',

          paddingTop:'60px'
        }}
      >

        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Link href="/">
        <Box
        style={{display:"flex",paddingLeft:"35px",marginTop:"150px",cursor:"pointer "}}

        >

           <img src='../../logout.svg' style={{color:"#2F2E40",marginRight:"15px"}} />
          <Typography style={{ fontWeight:'500',fontFamily:'Euclid Circular A'}} color='#2F2E40'>
            Logout
          </Typography>




        </Box>
        </Link>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#fff',
            color: '#FFFFFF',
            width: 280,
            marginTop:"83px"
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#fff',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
