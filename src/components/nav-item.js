import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;

  return (
    <ListItem
      disableGutters
      style={{paddingLeft:"16px"}}
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,

      }}
      {...others}
    >
      <NextLink
        href={href}
        passHref
      >
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          style={{paddingTop:"20px",paddingBottom:"20px"}}
          sx={{
            backgroundColor: active && '#2F2E40',
            borderRadius: "33.5765px 0px 0px 33.5765px",
            fontFamily:"Euclid Circular A",
            color: active ? '#fff' : '#2F2E40',
            fontWeight: 400 && 400,
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            fontSize:'18px',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? '#fff' : '#2F2E40',
              fontSize:"25px !important",

            },


            '&:hover': {
              backgroundColor: '#2f2e406b !important',
              color:"#fff",
              '& .MuiButton-startIcon': {
                color:  '#fff'
              },
            },
            '&::before':{
              background: active && ' #2f2e40',
              content: active && '" "" "',
              position: active && 'absolute',
              width: active && '20px',
              height: active && ' 70px',
              /* background: red, */
              width:active &&  ' 40px',
              height: active && ' 80px',
              top:active &&  '100%',
              right:active &&  '-3%',

              clipPath: active && 'polygon(100% 0, 100% 100%, 96% 78%, 90% 58%, 80% 41%, 63% 25%, 37% 11%, 24% 6%, 0 0)'
            },

            '&::after':{
              background: active && ' #2f2e40',
              content: active && '" "" "',
              position: active && 'absolute',
              width: active && '20px',
              height: active && ' 70px',
              /* background: red, */
              width:active &&  ' 40px',
              height: active && ' 91px',
              top:active &&  '-122%',
              right:active &&  '-3%',

              clipPath: active && 'polygon(100% 0, 100% 100%, 0 100%, 20% 96%, 49% 86%, 71% 71%, 85% 53%, 95% 30%, 99% 11%)'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
