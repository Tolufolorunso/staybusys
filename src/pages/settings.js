import * as React from "react";

import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";

import { DashboardLayout } from "../components/dashboard-layout";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import Modal from "@mui/material/Modal";
import Select from "react-select";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const smallerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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
        <Box sx={{ p: 3 }} style={{ paddingLeft: 0, paddingRight: 0, paddingTop: "40px" }}>
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
  const options = [
    { value: "Euro", label: "Euro" },
    { value: "Naira", label: "Naira" },
    { value: "Dollar", label: "Dollar" },
  ];
  const customStyles = {
    indicatorSeparator: () => ({
      // none of react-select's styles are passed to <Control />
      border: 0,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      border: "1px solid #969696",
      display: "flex",
      borderRadius: "8px",
      marginTop:"10px",
      height: "50px",
      paddingRight: "12px",
      paddingLeft: "12px",
      fontFamily: "Euclid Circular A",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "140%",
      /* or 25px */
width:"300px",
      letterSpacing: " 0.03em",

      color: "#2F2E40 ",
    }),
    indicatorsContainer: () => ({
      color: "#2F2E40 !important",
    }),
    dropdownIndicator: () => ({
      color: "#2F2E40 !important",
      marginTop: "13px",
    }),
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [showAccDetails, setShowAccDetails] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSecondModal, setopenSecondModal] = React.useState(false);
  const handleopenSecondModal = () => setopenSecondModal(true);
  const handlecloseSecondModal = () => setopenSecondModal(false);
  function closeModals() {
    setopenSecondModal(false);
    setOpen(false);
  }
  return (
    <>
      <div className="tasks_page">
        <Head>
          <title>Settings | Stay busy</title>
        </Head>
        <h1 className="header_text" style={{ marginTop: "20px", marginLeft: "30px" }}></h1>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Typography color="textPrimary" gutterBottom variant="h3">
              Settings
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  className="tabs"
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Profile" className="tabs_titles" {...a11yProps(0)}></Tab>{" "}
                  <Tab className="tabs_titles2" label="Payment" {...a11yProps(1)}></Tab>{" "}
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="profile">
                  <div className="left">
                    <p>Personal information:</p>
                    <small>Update your details and other info here</small>
                  </div>
                  <div className="right">
                    <div className="top">
                      <img src="/static/images/avatars/settings.png" alt="" />
                      <div className="top_details">
                        <Typography variant="caption">Edit your profile photo</Typography>

                        <button className="actn_btn">Change</button>
                      </div>
                    </div>

                    <div className="input_wrap" style={{ marginTop: "65px" }}>
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                          <div className="inputs" style={{ width: "100%" }}>
                            <label htmlFor="First name:">First name:</label> <br />
                            <input type="text" style={{ width: "100%" }} placeholder="Seyi" />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="inputs" style={{ width: "100%" }}>
                            <label htmlFor="Last name:">Last name:</label> <br />
                            <input type="text" style={{ width: "100%" }} placeholder="Blessing" />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="inputs" style={{ width: "100%" }}>
                            <label htmlFor="Email:">Email Address:</label> <br />
                            <input
                              type="email"
                              style={{ width: "100%" }}
                              placeholder="Seyi@staybusy.io"
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="inputs" style={{ width: "100%" }}>
                            <label htmlFor="Phone Number">Phone Number:</label> <br />
                            <input
                              type="number"
                              style={{ width: "100%" }}
                              placeholder="07041328653"
                            />
                          </div>
                        </Grid>
                      </Grid>

                      <button className="actn_btn">Update</button>
                    </div>
                  </div>
                </div>

                <hr className="divide" />

                <div className="profile">
                  <div className="left">
                    <p>Interests:</p>
                    <small>Update your interests to affects the kinds of tasks you receive</small>
                  </div>
                  <div className="right">
                    <div className="input_wrap">
                      <Grid container spacing={3}>
                        <Grid item xs={6} sm={4} md={3} lg={2.4}>
                          <button variant="contain" className="interests_btn">
                            Tag 1
                          </button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.4}>
                          <button variant="contain" className="interests_btn">
                            Tag 2
                          </button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.4}>
                          <button variant="contain" className="interests_btn">
                            Tag 3
                          </button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.4}>
                          <button variant="contain" className="interests_btn">
                            Tag 4
                          </button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.4}>
                          <button variant="contain" className="interests_btn">
                            Tag 5
                          </button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.4}>
                          <button variant="contain" className="interests_btn">
                            Tag 6
                          </button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.4}>
                          <button variant="contain" className="interests_btn">
                            Tag 7
                          </button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.4}>
                          <button variant="contain" className="interests_btn">
                            Tag 8
                          </button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.4}>
                          <button variant="contain" className="interests_btn">
                            Tag 9
                          </button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.4}>
                          <button variant="contain" className="interests_btn">
                            Tag 10
                          </button>
                        </Grid>
                      </Grid>

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
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                          <div className="inputs" style={{ width: "100%", marginBottom: "20px" }}>
                            <label htmlFor="old password">Old Password:</label> <br />
                            <input
                              type="password"
                              style={{ width: "100%" }}
                              placeholder="......................."
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                          <div className="inputs" style={{ width: "100%" }}>
                            <label htmlFor="password">New Password:</label> <br />
                            <input
                              type="password"
                              style={{ width: "100%" }}
                              placeholder="......................."
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="inputs" style={{ width: "100%" }}>
                            <label htmlFor="Confirm">Confirm Password:</label> <br />
                            <input
                              type="password"
                              style={{ width: "100%" }}
                              placeholder="................"
                            />
                          </div>
                        </Grid>
                      </Grid>
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
                      Update your details and other
                      info here
                    </small>
                  </div>
                  <div className="right">
                    <div className="top payment">
                      <div className="top_details">
                        {showAccDetails ? (
                          <div className="acoout_info">
                            <div className="wrapper">
                              <div className="left">
                                <div className="act_info">
                                  <p>Bank Name:</p>
                                  <span>United Bank For Afrfica</span>
                                </div>
                                <div className="act_info">
                                  <p>Account Name:</p>
                                  <span>Melanie Walters</span>
                                </div>
                                <div className="act_info">
                                  <p>Account Number:</p>
                                  <span>2086078162</span>
                                </div>
                                <div className="act_info">
                                  <p>Country:</p>
                                  <span>Nigeria</span>
                                </div>
                              </div>

                              <div className="right">
                                <button>Edit</button>
                                <small>Added, oct 7,2021</small>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p>You’ve not added a withdrawal account</p>
                        )}

                        <button onClick={handleOpen} className="actn_btn">
                          Add an account
                        </button>
                        <div>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                          </Typography> */}
                              <div className="add_acc_modal">
                                <div className="add">
                                  <p>Add a new bank account</p>
                                  <span>X</span>
                                </div>

                                <hr />

                                <div className="add_inputs">
                                  <div className="add_input ">
                                    <label htmlFor="Old password">Country</label> <br />
                                    <input type="password" placeholder="Nigeria" />
                                  </div>
                                  <div className="add_input ">
                                    <label htmlFor="Old password">Bank Name</label> <br />
                                    <input type="password" placeholder="UBA" />
                                  </div>
                                  <div className="add_input ">
                                    <label htmlFor="Old password">Account Number</label> <br />
                                    <input type="password" placeholder="2086 078 162" />
                                  </div>
                                  <div className="add_input ">
                                    <label htmlFor="Old password">Account Name</label> <br />
                                    <input type="password" placeholder="Jasmine McDougal" />
                                  </div>

                                  <button onClick={handleopenSecondModal}>Add bank account</button>
                                </div>
                              </div>
                            </Box>
                          </Modal>
                        </div>
                        <div>
                          <Modal
                            open={openSecondModal}
                            onClose={handlecloseSecondModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={smallerStyle}>
                              <div className="response">
                                <div className="modal_resp">
                                  <div className="top">
                                    <div className="icon"></div>
                                    <p>Add bank account</p>
                                  </div>

                                  <p className="desc">
                                    Your bank account has been added <br /> successfully. This is
                                    where your withdrawal will <br /> be processed into
                                  </p>

                                  <button onClick={closeModals}>Okay, Close.</button>
                                </div>
                              </div>
                            </Box>
                          </Modal>
                        </div>
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
                          <label htmlFor="Currency">Currency</label> <br />
                          <Select
                            defaultValue={options[1]}
                            styles={customStyles}
                            options={options}
                            theme={(theme) => ({
                              ...theme,

                              colors: {
                                ...theme.colors,
                                primary25: "#f2e9c4",
                                primary: "#2f2e40",
                                neutral5: "#000",
                                primary50: "#f2e9c4",
                              },
                            })}
                          />

                        </div>

                        <button className="actn_btn" style={{width:"200px"}}>Update</button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Box>
          </Container>
        </Box>
      </div>
    </>
  );
}

Task.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
