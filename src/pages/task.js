/* eslint-disable react/jsx-max-props-per-line */
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
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import Box from "@mui/material/Box";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { completedTasks } from "src/__mocks__/completedTasks";
import { getSession } from "next-auth/react";
import SubmitTask from "src/components/submit-task";
import { deleteSubmission, fetchJson, getSubmission, getUserTasks, saveSubmission } from "lib/api";
import { API_URI } from "lib/contant";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

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
        <Box style={{ padding: "24px 0px" }}>
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
  const { user, onGoingTask, completedTasks, error } = props;
  const [value, setValue] = React.useState(0);
  const [selectValue, setSelectValue] = useState("Upload a file");
  const [isShown, setIsShown] = useState("");
  const [urls, setUrls] = useState("");
  const [files, setFiles] = useState(null);

  const [taskDetail, settaskDetail] = useState(null);
  const [scroll, setScroll] = React.useState("paper");

  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [openSecondModal, setopenSecondModal] = React.useState(false);
  // useEffect(() => {
  //   setTaskTakens(user?.taskTaken)
  //   setOngoingTask(user?.taskTaken?.length)
  // },[])
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openSecondModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openSecondModal]);
  const descriptionElementRef2 = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [taskTakens, setTaskTakens] = useState(onGoingTask);
  const [onGoingTasks, setOngoingTask] = useState(onGoingTask.length || "0");

  const [completedtaskArr, setCompletedTaskArr] = useState(completedTasks);
  const [completedTasksLength, setCompletedTasksLength] = useState(completedTasks.length || "0");

  // useEffect(() => {
  //   // setTaskTakens(user?.taskTaken)
  //   // setOngoingTask(user?.taskTaken?.length)
  //   fetchJson("")
  // },[])

  const handleClick = (id, newValue) => {
    // 👇️ toggle shown state

    // setIsShown((current) => !current);
    if (isShown !== id) setFiles(null);

    setIsShown(id);
    // setIsShown(true);
  };
  const handlecloseSecondModal = () => setopenSecondModal(false);
  function closeModals() {
    setopenSecondModal(false);
    setOpen(false);
  }
  function readMoreHandler(id) {
    const task = taskTakens.find((task) => task._id === id);
    settaskDetail(task);
    setopenSecondModal(true);
  }

  function handleSelectChange(e) {
    let { value } = e.target;
    setSelectValue(value);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function onChangleHandler(e) {
    if (selectValue === "Add a link") {
      setUrls(e.target.value);
    } else {
      setFiles(e.target.files[0]);
    }
  }

  async function saveSubmissionHandler(taskId) {
    const url = `${API_URI}/submissions/${taskId}`;
    const token = user.accessToken;
    let formData = new FormData();

    if (selectValue === "Add a link") {
      if (!urls) return toast.error("Enter the task link");
      formData.append("url", urls);
    } else {
      if (!files) return toast.error("upload file");
      formData.append("uploadedFiles", files);
    }

    try {
      const result = await saveSubmission(token, url, formData);

      if (result.status) {
        toast.success("Task Completed, Good job");
        await fetch("/api/auth/session?update");
        setTaskTakens(function () {
          return taskTakens.filter((task) => {
            return task._id !== taskId;
          });
        });
        setCompletedTaskArr(result.submissions);
        setOngoingTask(onGoingTasks - 1);
        setCompletedTasksLength(+completedTasksLength + 1);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleDeleteSubmission(submissionId) {
    const url = `${API_URI}/submissions/${submissionId}`;
    const token = user.accessToken;
    try {
      const response = await deleteSubmission(token, url);
      if (response.status) {
        toast.success(response.message);
        setCompletedTaskArr(() => {
          setCompletedTasksLength(completedTasksLength - 1);
          return completedtaskArr.filter((task) => task._id !== submissionId);
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetch("/api/auth/session?update");
  }, []);

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
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <ToastContainer />
            <Typography color="textPrimary" gutterBottom variant="h3">
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
                        <StyledBadge badgeContent={onGoingTasks} color="secondary"></StyledBadge>
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
                        <StyledBadge
                          badgeContent={completedTasksLength}
                          color="secondary"
                        ></StyledBadge>
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
                {error ? (
                  <h2>{error}</h2>
                ) : (
                  taskTakens.map((task) => {
                    return (
                      <div className="ongoing" key={task._id}>
                        <div className="end">
                          <span>Ongoing</span>
                        </div>
                        <p>{task.title}</p>
                        <small>{task.description.slice(0, 200) + "..."}</small>
                        <div className="grid_sec_btns">
                          <button className="read_more" onClick={() => readMoreHandler(task._id)}>
                            Read More
                          </button>
                          <div className="btnn">
                            {isShown === task._id && (
                              <button className="button_enroll8 " onClick={() => setIsShown("")}>
                                {" "}
                                Close
                              </button>
                            )}
                            <button
                              className="button_enroll1 "
                              onClick={() => handleClick(task._id)}
                            >
                              {" "}
                              Submit task
                            </button>
                          </div>
                        </div>
                        {isShown === task._id && (
                          <SubmitTask
                            handleSelectChange={handleSelectChange}
                            files={files}
                            selectValue={selectValue}
                            taskId={task._id}
                            saveSubmissionHandler={saveSubmissionHandler}
                            onChangleHandler={onChangleHandler}
                          />
                        )}
                      </div>
                    );
                  })
                )}

                {/* <div className="add_btnn">
                  <button className="add_btn">
                    {" "}
                    <AddOutlinedIcon /> Add Submission
                  </button>
                </div> */}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {completedtaskArr.map((completed) => {
                  return (
                    <div className="completed" key={completed._id}>
                      <div className="end">
                        <span>{completed.status}</span>
                      </div>
                      <p>{completed?.taskId?.title}</p>

                      <div className="details">
                        <small>{completed?.taskId?.description}</small>

                        <span>24-May-2022</span>
                      </div>

                      <hr style={{ border: "1px solid rgba(0, 0, 0, 0.2)" }} />

                      <div className="below_hr">
                        <div className="submit">Submission</div>

                        <div className="hold_file">
                          <div className="file_hold">
                            {completed.urls.length >= 1 ? (
                              <a href={completed.urls} rel="noreferrer" target="_blank">
                                {completed.urls}
                              </a>
                            ) : (
                              <a
                                href={`${API_URI}/${completed.files}`}
                                download
                                rel="noreferrer"
                                target="_blank"
                              >
                                <img src="./pdf.svg" width="55px" />
                                <div className="file_details">
                                  <small>{completed.uploadedFile}</small>
                                  <span>{completed.date}</span>
                                </div>
                              </a>
                            )}
                          </div>

                          <div className="delete">
                            <button onClick={() => handleDeleteSubmission(completed._id)}>
                              <img src="./delete.svg" width="40px" />
                            </button>
                            {completed.urls.length >= 1 ? null : (
                              <a href={`${API_URI}/${completed.files}`}>
                                <img src="./downloads.svg" width="40px" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </TabPanel>
            </Box>
          </Container>
          <Dialog
            open={openSecondModal}
            onClose={handlecloseSecondModal}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogContent>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <div className="filter_modal">
                  <div className="filter_modal_desc">
                    <div className="modal_secions">
                      <div className="research">
                        <span className="open_text">{taskDetail?.tag}</span>
                        <span className="square"></span>
                      </div>

                      <p className="header_text">{taskDetail?.title}</p>
                      <p className="desc">{taskDetail?.description}</p>

                      <div className="filter_btns ">
                        <p>£{taskDetail?.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Box>
      </div>
    </>
  );
}

Task.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }

  try {
    const userTasks = await getUserTasks(session?.user?.accessToken, `${API_URI}/tasks/user-tasks`);
    const { submissions } = await getSubmission(
      session?.user?.accessToken,
      `${API_URI}/submissions`
    );

    // console.log(422, submissions);

    return {
      props: {
        ...session,
        onGoingTask: userTasks.onGoingTasks,
        // completedTasks: userTasks.completedTasks,
        completedTasks: submissions,
      },
    };
  } catch (error) {
    return {
      props: {
        ...session,
        onGoingTask: [],
        completedTasks: [],
        error: error.message,
      },
    };
  }
}
