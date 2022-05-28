import * as React from "react";

import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
// import Box from "@mui/material/Box";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    left:10,
    top: 0,
    border: `none`,
    background: `rgba(255, 204, 0, 0.15)`,
    borderRadius: `10px`,
    padding: `10px 20px`,
    width: `41px`,
    height: `51px`,
    marginLeft:'7.5rem',
    color: "black",
    
  
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Task() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="tasks_page">
        <Head>
          <title>Task | Material Kit</title>
        </Head>
        <h1 className="header_text" style={{ marginTop: "20px", marginLeft: "30px" }}>
          My Tasks
        </h1>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              className="tabs"
              style={{ marginLeft: "30px" }}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                
                label="Profile"
                {...a11yProps(0)}
              ></Tab>{" "}
              <Tab
                
                style={{ marginLeft: "2rem" }}
                label="Payment"
                {...a11yProps(1)}
              ></Tab>{" "}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            
          </TabPanel>
          <TabPanel value={value} index={1}>
            
          </TabPanel>
        </Box>
      </div>
    </>
  );
}

Task.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

