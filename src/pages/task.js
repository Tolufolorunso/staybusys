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
    right: -12,
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
        <Box  style={{padding:"24px 0px"}}>
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
          <title>Task | Staybusy.io</title>
        </Head>
        <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
        <Container maxWidth={false}>
        <Typography color="textPrimary"
            gutterBottom
            variant="h3">
          My Tasks
        </Typography>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              className="tabs"

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
                className="tabs_titles"

                {...a11yProps(0)}
              ></Tab>{" "}
              <Tab
                icon={
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary"></StyledBadge>
                  </IconButton>
                }
                iconPosition="end"
                className="tabs_titles2"

                label="Completed"
                {...a11yProps(1)}
              ></Tab>{" "}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="ongoing">
              <div className="end">
                <span >Ongoing</span>
              </div>
              <p>Auditing information architechture</p>
              <small>
                Listing out all of the findings from current or existing Informature architechture
                (IA).
              </small>
            </div>
            <div className="submission">
              <div className="submit"><div className="t2">Submission</div></div>
              <label>Preferred Method</label> <br />
              <select onChange={handleSelectChange}>
                <option value="Upload a file">Document upload</option>
                <option value="Add a link">Add a link</option>
              </select>

              <div className="display_inputs">
                { selectValue === 'Upload a file' ?
                <div className="file-upload">
                  <input type="file" />
                  <div className="items">
                    <BackupOutlinedIcon style={{ fontSize: "45px", color: "lightgray" }} />
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

             <div className="completed" key={completed}>
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

              <hr style={{border:"1px solid rgba(0, 0, 0, 0.2)"}}/>

              <div className="below_hr">
                <div className="submit">Submission</div>

                <div className="hold_file">
                  <div className="file_hold">
                  <img src="./pdf.svg" width='55px' />
                    <div className="file_details">
                      <small>{completed.uploadedFile}</small>
                      <span>{completed.date}</span>
                    </div>
                  </div>

                  <div className="delete">
                    <button>
                     <img src="./delete.svg" width='40px' />
                    </button>
                    <button>
                     <img src="./downloads.svg" width='40px' />
                    </button>
                  </div>
                </div>
              </div>
            </div>)}

          </TabPanel>
        </Box>
        </Container>
        </Box>
      </div>
    </>
  );
}


Task.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
