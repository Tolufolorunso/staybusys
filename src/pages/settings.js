/* eslint-disable react/jsx-max-props-per-line */
import * as React from "react";

import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { DashboardLayout } from "../components/dashboard-layout";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Modal from "@mui/material/Modal";
import Select from "react-select";
import { fetchJson, getSetting } from "lib/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { API_URI } from "lib/contant";
import { getSession } from "next-auth/react";
import { LoadingButton } from "@mui/lab";
import { getTags } from "lib/get-tags";
import { CloudUpload, Cancel } from "@mui/icons-material";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "1px solid rgba(105, 110, 255, 0.2)",
  boxShadow: 24,
};
const smallerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "1px solid rgba(105, 110, 255, 0.2)",
  boxShadow: 24,
};

// const selectedTasks = [];

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

export default function Task(props) {
  const [value, setValue] = React.useState(0);
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const { user, tags } = props;
  const [selectedTasks, setSelectedTasks] = React.useState(user.tags);
  const [imagePreview, setImagePreview] = useState("/static/images/avatars/avatar_1.png");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [fileName, setFilename] = useState(null);
  const [userAccountDetail, setUserAccountDetail] = useState(user?.accountDetail[0]);
  const router = useRouter();
  const handleUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const [file] = e.target.files || e.dataTransfer.files;
    setUserImage(file);
    uploadFile(file);
    setFile(file);
  };

  function uploadFile(file) {
    try {
      const reader = new FileReader();

      reader.readAsBinaryString(file);
      // console.log(file);
      // setFile(file)
      reader.onload = (e) => {
        // this is the base64 data
        const fileRes = btoa(reader.result);
        // setFile(`data:image/jpg;base64,${fileRes}`);
        // console.log(`data:image/jpg;base64,${fileRes}`);
        setImagePreview(`data:image/jpg;base64,${fileRes}`);
      };
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  }
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", file);
    const result = await fetchJson(`${API_URI}/users/change-profile-image`, {
      method: "PATCH",
      headers: { authorization: `Bearer ${user.accessToken}` },
      body: formData,
    });

    if (result.status) {
      await fetch("/api/auth/session?update");
      toast.success("profile updated");
      router.push("/settings");
    } else {
      toast.error("An error occurred...");
    }
  };

  const handleRemove = () => {
    setFile(null);
    setFilename(null);
    setImagePreview("/static/images/avatars/avatar_1.png");
  };

  const options = [
    { value: "Euro", label: "Euro" },

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
      marginTop: "10px",
      height: "50px",
      paddingRight: "12px",
      paddingLeft: "12px",
      fontFamily: "Euclid Circular A",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "140%",
      /* or 25px */
      width: "300px",
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
  const [scroll, setScroll] = React.useState("paper");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const [openSecondModal, setopenSecondModal] = React.useState(false);
  const handleopenSecondModal = () => setopenSecondModal(true);
  const handlecloseSecondModal = () => setopenSecondModal(false);
  function closeModals() {
    setopenSecondModal(false);
    setOpen(false);
  }
  function closeModals1() {
    setopenSecondModal(true);
    setOpen(false);
  }

  const [basicValues, setBasicValues] = React.useState({
    email: user.email,
    phone_number: user.phone_number,
    firstname: user.firstname,
    lastname: user.lastname,
  });

  const [passwordValues, setPasswordValues] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  async function profileBasicHandler() {
    const { email, firstname, lastname, phone_number } = basicValues;
    setLoading(true);
    try {
      const updatedUser = await fetchJson(`${API_URI}/users/basic`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ email, phone_number, firstname, lastname }),
      });

      if (updatedUser.status) {
        await fetch("/api/auth/session?update");
        setLoading(false);
        toast.success("profile updated");
        console.log(updatedUser);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }

  const removeSelectedTasks = (arr, value) => {
    return arr.filter(function (ele) {
      return ele != value;
    });
  };

  const handleSelect = (event) => {
    const task = event.currentTarget.dataset.task;

    if (selectedTasks.includes(task)) {
      selectedTasks = removeSelectedTasks(selectedTasks, task);
      event.currentTarget.classList.remove("is__selected");
    } else {
      if (selectedTasks.length > 3) return toast.error("You can select only 4 tasks");
      selectedTasks.push(task);
      event.currentTarget.classList.add("is__selected");
    }
  };

  async function updateFavHandler() {
    if (selectedTasks.length < 1) {
      return toast.error("Select atleast one tag");
    }

    try {
      const updatedUser = await fetchJson(`${API_URI}/users/update-tag`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ tags: selectedTasks.join(",") }),
      });

      console.log(updatedUser);

      if (updatedUser.status) {
        await fetch("/api/auth/session?update");
        setLoading(false);
        toast.success("profile updated");
        console.log(updatedUser);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      // console.log(error);
    }
  }

  function changeBasicInfoHandler(e) {
    setBasicValues({ ...basicValues, [e.target.name]: e.target.value });
  }

  function passwordOnChangeHandler(e) {
    setPasswordValues({ ...passwordValues, [e.target.name]: e.target.value });
  }

  async function changePasswordHandler() {
    const { oldPassword, newPassword, confirmPassword } = passwordValues;
    if (newPassword !== confirmPassword) {
      return toast.error("passwords not matched");
    }

    try {
      const updatedUser = await fetchJson(`${API_URI}/auth/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (updatedUser.status) {
        await fetch("/api/auth/session?update");
        setLoading(false);
        toast.success(updatedUser.message);
        console.log(updatedUser);
      }
      if (!updatedUser.status) {
        throw new Error(updatedUser.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      // console.log(error);
    }
  }

  const [accountDetail, setAccountDetail] = useState({
    country: userAccountDetail?.country || "",
    bankName: userAccountDetail?.bankName || "",
    bankAccountNumber: userAccountDetail?.bankAccountNumber || "",
    bankAccountName: userAccountDetail?.bankAccountName || "",
    sortCode: userAccountDetail?.sortCode || "",
  });

  function addAccountChangeHandler(e) {
    setAccountDetail({ ...accountDetail, [e.target.name]: e.target.value });
  }

  async function addAccountHandler() {
    console.log(accountDetail);
    try {
      const updatedUser = await fetchJson(`${API_URI}/users/add-account`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({ ...accountDetail }),
      });

      if (updatedUser.status) {
        await fetch("/api/auth/session?update");
        toast.success(updatedUser.message);
        setUserAccountDetail(updatedUser?.accountDetail?.accountDetail[0]);
        handleClose();
      } else {
        throw new Error(updatedUser.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetch("/api/auth/session?update");
  },[])

  return (
    <>
      <div className="tasks_page">
        <Head>
          <title>Settings | Staybusy.io</title>
        </Head>
        <ToastContainer />
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
                    <Box className="top">
                      {file ? (
                        <>
                          <Cancel
                            onClick={handleRemove}
                            style={{ color: "red", cursor: "pointer", margin: "0 2px" }}
                          />
                          <img alt={fileName} src={imagePreview} className="imageUploads" />
                          <span>{fileName}</span>
                          <div
                            className="top_details"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography variant="caption">Edit your profile photo</Typography>
                            <button className="actn_btn" onClick={handleImageSubmit}>
                              Update
                            </button>{" "}
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            onClick={handleUpload}
                            name="file"
                            type={fileTypes}
                            className="imageUploads"
                            alt={user.firstname}
                            src={`${API_URI}/${user.image}`}
                          />{" "}
                          <div
                            className="top_details"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography variant="caption">Edit your profile photo</Typography>

                            <div className="uploaded">
                              <input
                                type="file"
                                style={{ height: "57.5px" }}
                                accept="image/*"
                                onChange={(e) => handleUpload(e)}
                              />
                              Change
                            </div>
                          </div>
                        </>
                      )}
                      <div className="top_details"></div>
                    </Box>

                    <div className="input_wrap" style={{ marginTop: "65px" }}>
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                          <div className="inputs" style={{ width: "100%" }}>
                            <label htmlFor="firstname:">First name:</label> <br />
                            <input
                              id="firstname"
                              type="text"
                              style={{ width: "100%" }}
                              placeholder="Seyi"
                              value={basicValues.firstname}
                              name="firstname"
                              onChange={changeBasicInfoHandler}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="inputs" style={{ width: "100%" }}>
                            <label htmlFor="lastname:">Last name:</label> <br />
                            <input
                              type="text"
                              id="lastname"
                              style={{ width: "100%" }}
                              placeholder="Blessing"
                              value={basicValues.lastname}
                              name="lastname"
                              onChange={changeBasicInfoHandler}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="inputs" style={{ width: "100%" }}>
                            <label htmlFor="Email:">Email Address:</label> <br />
                            <input
                              type="email"
                              style={{ width: "100%" }}
                              placeholder="Seyi@staybusy.io"
                              value={basicValues.email}
                              name="email"
                              onChange={changeBasicInfoHandler}
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
                              value={basicValues.phone_number}
                              name="phone_number"
                              onChange={changeBasicInfoHandler}
                            />
                          </div>
                        </Grid>
                      </Grid>

                      {/* <button className="actn_btn" onClick={profileBasicHandler}>
                        Update
                      </button> */}
                      <LoadingButton
                        loading={loading}
                        type="button"
                        variant="contained"
                        loadingPosition="end"
                        className="actn_btn"
                        style={{ marginTop: "20px" }}
                        onClick={profileBasicHandler}
                      >
                        Update
                      </LoadingButton>
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
                        {tags.map((tag) => {
                          return (
                            <Grid item xs={6} sm={4} md={3} lg={2.4} key={tags._id}>
                              <button
                                fullWidth
                                size="large"
                                variant="contain"
                                data-task={tag.tag}
                                className={`task__list interests_btn ${
                                  selectedTasks.includes(tag.tag) ? "is__selected" : ""
                                }`}
                                onClick={handleSelect}
                              >
                                {tag.tag}
                              </button>
                            </Grid>
                          );
                        })}
                      </Grid>
                      <button className="actn_btn" onClick={updateFavHandler}>
                        Update
                      </button>
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
                              name="oldPassword"
                              value={passwordValues.oldPassword}
                              onChange={passwordOnChangeHandler}
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
                              name="newPassword"
                              value={passwordValues.newPassword}
                              onChange={passwordOnChangeHandler}
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
                              name="confirmPassword"
                              value={passwordValues.confirmPassword}
                              onChange={passwordOnChangeHandler}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <button className="actn_btn" onClick={changePasswordHandler}>
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="profile">
                  <div className="left">
                    <p>Account Information</p>
                    <small>Update your details and other info here</small>
                  </div>

                  <div className="right">
                    <div className="tops payment">
                      <div className="top_details">
                      {!userAccountDetail? (
                          <p>You’ve not added a withdrawal account</p>
                      ):("")}
                      {!userAccountDetail? "":
                        <div className="acoout_info">
                          <div className="wrapper">
                            <div className="left">
                              <div className="act_info">
                                <Grid container spacing={4}>
                                  <Grid item xs={6}>
                                    <p>Bank Name:</p>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <span>{userAccountDetail?.bankName}</span>
                                  </Grid>
                                </Grid>
                              </div>

                              <div className="act_info">
                                <Grid container spacing={4}>
                                  <Grid item xs={6}>
                                    <p>Account Name:</p>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <span>{userAccountDetail?.bankAccountName}</span>
                                  </Grid>
                                </Grid>
                              </div>
                              <div className="act_info">
                                <Grid container spacing={4}>
                                  <Grid item xs={6}>
                                    <p>Account Number:</p>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <span>{userAccountDetail?.bankAccountNumber}</span>
                                  </Grid>
                                </Grid>
                              </div>
                              <div className="act_info">
                                <Grid container spacing={4}>
                                  <Grid item xs={6}>
                                    <p>Country:</p>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <span>{userAccountDetail?.country}</span>
                                  </Grid>
                                </Grid>
                              </div>
                            </div>

                            <div className="right">
                              <button onClick={handleOpen}>
                                {" "}
                                <img src="./PENCIL.svg" style={{ marginRight: "8px" }} /> Edit
                              </button>
                              <small>Added, oct 7,2021</small>
                            </div>
                          </div>
                        </div>}
                        <div>
                        {!userAccountDetail ?
                          <button onClick={handleOpen} className="actn_btn">
                           Add an account
                          </button>:""}
                        </div>
                        <div>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            scroll={scroll}
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                          >
                            <DialogContent dividers={scroll === "paper"}>
                              <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                              >
                                <Box className="acct_names">
                                  <div className="add_acc_modal">
                                    <div style={{ padding: "20px" }} className="add">
                                      <Typography variant="h5" className="">
                                        {!userAccountDetail
                                          ? "Add a new bank account"
                                          : "Update account"}
                                      </Typography>
                                      <img
                                        src="./cancel.svg"
                                        alt="cancel"
                                        style={{ cursor: "pointer" }}
                                        width="38px"
                                        onClick={handleClose}
                                      />
                                    </div>

                                    <hr className="hr_with" />

                                    <div className="add_inputs">
                                      <div className="add_input ">
                                        <label htmlFor="Country">Country</label> <br />
                                        <input
                                          type="text"
                                          name="country"
                                          onChange={addAccountChangeHandler}
                                          value={accountDetail.country}
                                        />
                                      </div>
                                      <div className="add_input ">
                                        <label htmlFor="Bank">Bank Name</label> <br />
                                        <input
                                          type="text"
                                          name="bankName"
                                          onChange={addAccountChangeHandler}
                                          value={accountDetail.bankName}
                                        />
                                      </div>
                                      <div className="add_input ">
                                        <label htmlFor="AccountNumber">Account Number</label> <br />
                                        <input
                                          type="number"
                                          name="bankAccountNumber"
                                          onChange={addAccountChangeHandler}
                                          value={accountDetail.bankAccountNumber}
                                        />
                                      </div>
                                      <div className="add_input ">
                                        <label htmlFor="withdraw">Sort Code</label> <br />
                                        <input
                                          type="number"
                                          name="sortCode"
                                          onChange={addAccountChangeHandler}
                                          value={accountDetail.sortCode}
                                        />
                                      </div>
                                      <div className="add_input ">
                                        <label htmlFor="withdraw">Account Name</label> <br />
                                        <input
                                          type="text"
                                          name="bankAccountName"
                                          onChange={addAccountChangeHandler}
                                          value={accountDetail.bankAccountName}
                                        />
                                      </div>

                                      <button onClick={addAccountHandler}>
                                        {!userAccountDetail
                                          ? "Add Account Detail"
                                          : "Update account"}
                                      </button>
                                    </div>
                                  </div>
                                </Box>
                              </DialogContentText>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <div>
                          <Modal
                            open={openSecondModal}
                            onClose={handlecloseSecondModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={smallerStyle} className="acct_names">
                              <div className="response">
                                <div className="modal_resp">
                                  <div className="top">
                                    <div className="icon">
                                      {" "}
                                      <img src="./gott.svg" />
                                    </div>

                                    <Typography variant="h5" className="">
                                      Add bank account
                                    </Typography>
                                  </div>

                                  <p className="desc">
                                    Your bank account has been added successfully. This is where
                                    your withdrawal will be processed into
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

                        {/* <button className="actn_btn" style={{ width: "200px" }}>
                          Update
                        </button> */}
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

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const { user } = await getSetting(session?.user?.accessToken, `${API_URI}/users/me`);
    user.accessToken = session.accessToken;
    const tags = await getTags();
    return {
      props: {
        // ...session,
        user,
        tags,
      },
    };
  } catch (error) {
    return {
      props: {
        ...session,
        tags: [],
        settings: null,
        error: error.message,
      },
    };
  }
}
