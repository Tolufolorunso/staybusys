import * as React from "react";
import { useState } from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";

import { DashboardLayout } from "../components/dashboard-layout";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import Box from "@mui/material/Box";
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { completedTasks } from "src/__mocks__/completedTasks";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -10,
    top: 0,
    border: `none`,
    background: `rgba(255, 204, 0, 0.15)`,
    borderRadius: `10px`,
    padding: `10px 20px`,
    width: `41px`,
    height: `41px`,
    marginLeft: "7.5rem",
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
  const [selectValue, setSelectValue] = useState('Upload a file');

  function handleSelectChange(e) {
    let { value } = e.target;
    setSelectValue(value);
    console.log(value);
  }
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
                icon={
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary"></StyledBadge>
                  </IconButton>
                }
                iconPosition="end"
                label="Ongoing"
                style={{width:'200px', fontWeight:'700', color:'#2F2E40', fontSize: '20px', lineHeight: '130%'}}
                {...a11yProps(0)}
              ></Tab>{" "}
              <Tab
                icon={
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary"></StyledBadge>
                  </IconButton>
                }
                iconPosition="end"
                style={{width:'200px', fontWeight:'700', color:'#2F2E40', fontSize: '20px', lineHeight: '130%'}}
                label="Completed"
                {...a11yProps(1)}
              ></Tab>{" "}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="ongoing">
              <div className="end">
                <span>Ongoing</span>
              </div>
              <p>Auditing information architechture</p>
              <small>
                Listing out all of the findings from current or existing Informature architechture
                (IA).
              </small>
            </div>
            <div className="submission">
              <div className="submit">Submission</div>
              <label>Preferred Method</label> <br />
              <select onChange={handleSelectChange}>
                <option value="Upload a file">Upload a file</option>
                <option value="Add a link">Add a link</option>
              </select>

              <div className="display_inputs">

                { selectValue === 'Upload a file' ?
 
                <div className="file-upload">

                  <input type="file" />
                  <div className="items">
                    <BackupOutlinedIcon style={{ fontSize: "45px", color: "#2F2E40" }} />
                    <p>Upload a file</p>
                  </div>
                </div>
                :''}

                { selectValue === 'Add a link' ?
                <div className="input_link">
                  <label htmlFor="link">Enter submission link</label> <br />
                  <input type="text" />
                </div> : ''}
              </div> 
                

              <div className="btnn">
                <button className="sub_btn">Save Submission</button>
              </div>
            </div>

            <div className="add_btnn">
              <button className="add_btn">
                {" "}
                <AddOutlinedIcon /> Add Submission
              </button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            { completedTasks.map(completed =>

             <div className="completed">
              <div className="end">
                <span>{completed.status}</span>
              </div>
              <p>Auditing information architechture</p>

              <div className="details">
                <small>
                  Listing out all of the findings from current or existing Informature architechture
                  (IA).
                </small>

                <span>24-May-2022</span>
              </div>

              <hr />

              <div className="below_hr">
                <div className="submit">Submission</div>

                <div className="hold_file">
                  <div className="file_hold">
                    <UploadFileOutlinedIcon
                      style={{ color: "#FF6685", fontSize:'5rem', borderRadius: '10px',  background: '#f7f4ef', padding:'10px', width:'50px', height:'50px' }}
                      className="file_icon"
                    />
                    <div className="file_details">
                      <small>{completed.uploadedFile}</small>
                      <span>{completed.date}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="completed">
              <div className="end">
                <span>Completed </span>
              </div>
              <p>Auditing information architechture</p>


                  <div className="delete">
                    <button>
                      <DeleteOutlineOutlinedIcon style={{ color: "#DCDCDC", fontSize:'2rem' }} />
                    </button>
                    <button>
                      <BackupOutlinedIcon style={{ color: "#DCDCDC",fontSize:'2rem'  }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>)}
            
          </TabPanel>
        </Box>
      </div>
    </>
  );
}


Task.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

