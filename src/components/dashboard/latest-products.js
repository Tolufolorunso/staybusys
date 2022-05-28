import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  IconButton,
  Typography,
 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HoverImage from "react-hover-image";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
const Linked = styled('div')(({ theme }) => ({
  backgroundColor:"#fff",
  '&:hover':{
    backgroundColor:"#000",
    color:"#fff !important"
  }
}));

export const LatestProducts = (props) => (
  <Button
  component="a"
  
  disableRipple
  style={{paddingTop:"25px",paddingBottom:"25px"}}
  sx={{
    backgroundColor:'#fff',
    borderRadius: "10px",
    color:'#2F2E40',
    fontWeight: 'fontWeightBold',
    justifyContent: 'flex-start',
    px: 3,
    border:"1px solid #2F2E40",
    textAlign: 'center',
    textTransform: 'none',
    width: '100%',
    marginTop:"30px",
    marginBottom:"30px",
    '& .MuiButton-startIcon': {
      color: '#2F2E40',
      fontSize:"25px !important",
     
    },
    
    
    '&:hover': {
      backgroundColor: '#2F2E40 !important',
      color:"#fff",
      '& .MuiButton-startIcon': {
        color:  '#fff'
      },
    },
   
  }}
>
  <Box sx={{ flexGrow: 1 }} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
  <LocalAtmIcon style={{marginRight:"15px"}}/>
  <Typography>Withdraw your earnings</Typography>
  </Box>
</Button>
);
