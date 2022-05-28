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
              <Tab label="Profile" {...a11yProps(0)}></Tab>{" "}
              <Tab style={{ marginLeft: "2rem" }} label="Payment" {...a11yProps(1)}></Tab>{" "}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="profile">
              <div className="left">
                <p>Personal information:</p>
                <small>
                  Update your details and other <br /> info here
                </small>
              </div>
              <div className="right">
                <div className="top">
                  <img src="/static/images/avatars/settings.png" alt="" />
                  <div className="top_details">
                    <p>Edit your profile photo</p>

                    <button className="actn_btn">Change</button>
                  </div>
                </div>
                <div className="input_wrap">
                  <div className="inputs ">
                    <div className="input">
                      <label htmlFor="First name:">First name:</label> <br />
                      <input type="text" placeholder="Seyi" />
                    </div>
                    <div className="input">
                      <label htmlFor="First name:">Last name:</label> <br />
                      <input type="text" placeholder="Makinde" />
                    </div>
                    <div className="input">
                      <label htmlFor="First name:">Email Address:</label> <br />
                      <input type="text" placeholder="Seyi@example.com" />
                    </div>
                    <div className="input">
                      <label htmlFor="First name:">Phone number:</label> <br />
                      <input type="text" placeholder="08104038050" />
                    </div>
                  </div>

                  <button className="actn_btn">Update</button>
                </div>
              </div>
            </div>

            <hr className="divide" />

            <div className="profile">
              <div className="left">
                <p>Interests:</p>
                <small>
                  Update your interests to affects <br /> the kinds of tasks you receive
                </small>
              </div>
              <div className="right">
                <div className="input_wrap">
                  <div className="buttons">
                    <button>Tag 1</button>
                    <button>Tag 2</button>
                    <button>Tag 3</button>
                    <button>Tag 4</button>
                    <button>Tag 5</button>
                    <button>Tag 6</button>
                    <button>Tag 7</button>
                    <button>Tag 8</button>
                    <button>Tag 9</button>
                    <button>Tag 10</button>
                  </div>

                  <button className="actn_btn">Update</button>
                </div>
              </div>
            </div>
            <hr className="divide" />

            <div className="profile">
              <div className="left">
                <p>Password:</p>
                <small>Change your password here</small>
              </div>
              <div className="right">
                <div className="input_wrap">
                  <div className="input remove_margin">
                    <label htmlFor="Old password">Old password:</label> <br />
                    <input type="password" placeholder="........." />
                  </div>
                  <div className="inputs remove_marginB">
                    <div className="input remove_margin">
                      <label htmlFor="New Password">New password:</label> <br />
                      <input type="password" placeholder="........." />
                    </div>
                    <div className="input remove_margin">
                      <label htmlFor="Confirm new password">Confirm new password:</label> <br />
                      <input type="password" placeholder="........." />
                    </div>
                  </div>

                  <button className="actn_btn">Update</button>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="profile">
              <div className="left">
                <p>Account Information</p>
                <small>
                  Update your details and other <br />
                  info here
                </small>
              </div>
              <div className="right">
                <div className="top payment">
                  <div className="top_details">
                    <p>You’ve not added a withdrawal account</p>

                    <button className="actn_btn">Add an account</button>
                  </div>
                </div>
              </div>
            </div>

            <hr className="divide" />

            <div className="profile">
              <div className="left">
                <p>Currency:</p>
                <small>Choose your preferred earning currency</small>
              </div>
              <div className="right">
                <div className="top currency">
                  <div className="top_details">
                    <div className="input">
                      <label htmlFor="Confirm new password">Currency</label> <br />
                      <select>
                        <option value="Euro">Euro</option>
                        <option value="Dollar">Dollar</option>
                      </select>
                    </div>

                    <button className="actn_btn">Update</button>
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

Task.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
