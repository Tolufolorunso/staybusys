import * as React from "react";

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
// import Box from "@mui/material/Box";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
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
                icon={
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary"></StyledBadge>
                  </IconButton>
                }
                iconPosition="end"
                label="Ongoing"
                {...a11yProps(0)}
              ></Tab>{" "}
              <Tab
                icon={
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary"></StyledBadge>
                  </IconButton>
                }
                iconPosition="end"
                style={{ marginLeft: "2rem" }}
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
              <p>Preferred Method</p>

              <select>
                <option value="grapefruit">Upload a file</option>
                <option value="lime">Add a link</option>
              </select>

              <div className="display_inputs">
                <div className="file-upload">
                  <input type="file" />
                  <div className="items">
                    <BackupOutlinedIcon style={{ fontSize: "45px", color: "#2F2E40" }} />
                    <p>Upload a file</p>
                  </div>
                </div>

                <div className="input_link">
                  <label htmlFor="link">Enter submission link</label> <br />
                  <input type="text" />
                </div>
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
            <div className="completed">
              <div className="end">
                <span>Completed</span>
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

                <div className="file_hold">
                  <InsertDriveFileOutlinedIcon style={{ color: "#FF6685" }} className="file_icon" />
                  <div className="file_details">
                    <small>Information Architechture Audit 01.pdf</small>
                    <span>24-May-2022</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="completed">
              <div className="end">
                <span>Completed</span>
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

                <div className="file_hold">
                  <InsertDriveFileOutlinedIcon style={{ color: "#FF6685" }} className="file_icon" />
                  <div className="file_details">
                    <small>Information Architechture Audit 01.pdf</small>
                    <span>24-May-2022</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="completed">
              <div className="end">
                <span>Completed </span>
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

                <div className="file_hold">
                  <InsertDriveFileOutlinedIcon style={{ color: "#FF6685" }} className="file_icon" />
                  <div className="file_details">
                    <small>Information Architechture Audit 01.pdf</small>
                    <span>24-May-2022</span>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </Box>
      </div>
    </>
  );
}

// const Task = () => (
//   <>
//     <Head>
//       <title>
//         Task | Material Kit
//       </title>
//     </Head>
//     <h1 className='header_text' style={{marginTop:"20px"}}>
//       Task page
//     </h1>
//   </>
// );
Task.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default Task;
