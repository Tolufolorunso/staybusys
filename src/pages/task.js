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

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import Box from "@mui/material/Box";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { completedTasks } from "src/__mocks__/completedTasks";
import { getSession } from "next-auth/react";
import SubmitTask from "src/components/submit-task";
import { fetchJson, getUserTasks, saveSubmission } from "lib/api";
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

    setIsShown(id);
    // setIsShown(true);
  };

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
      formData.append("url", urls);
    } else {
      formData.append("uploadedFiles", files);
    }

    try {
      const result = await saveSubmission(token, url, formData);
      if (result.status) {
        toast.success("Task Completed, Good job");
        await fetch("/api/auth/session?update");
        setTaskTakens(function () {
          return taskTakens.filter((task) => {
            if (task._id === taskId) {
              setCompletedTaskArr([task, ...completedTasks]);
            }
            return task._id !== taskId;
          });
        });
        setOngoingTask(onGoingTasks - 1);
        setCompletedTasksLength(+completedTasksLength + 1);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
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
                        <small>{task.description}</small>
                        <div className="btnn">
                          {isShown === task._id && (
                            <button className="button_enroll8 " onClick={() => setIsShown("")}>
                              {" "}
                              Close
                            </button>
                          )}
                          <button className="button_enroll1 " onClick={() => handleClick(task._id)}>
                            {" "}
                            Submit task
                          </button>
                        </div>
                        {isShown === task._id && (
                          <SubmitTask
                            handleSelectChange={handleSelectChange}
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
                {completedtaskArr.map((completed) => (
                  <div className="completed" key={completed._id}>
                    <div className="end">
                      <span>{"completed"}</span>
                    </div>
                    <p>{completed.title}</p>

                    <div className="details">
                      <small>{completed.description}</small>

                      <span>24-May-2022</span>
                    </div>

                    <hr style={{ border: "1px solid rgba(0, 0, 0, 0.2)" }} />

                    <div className="below_hr">
                      <div className="submit">Submission</div>

                      <div className="hold_file">
                        <div className="file_hold">
                          <img src="./pdf.svg" width="55px" />
                          <div className="file_details">
                            <small>{completed.uploadedFile}</small>
                            <span>{completed.date}</span>
                          </div>
                        </div>

                        <div className="delete">
                          <button>
                            <img src="./delete.svg" width="40px" />
                          </button>
                          <button>
                            <img src="./downloads.svg" width="40px" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
    
    return {
      props: {
        ...session,
        onGoingTask: userTasks.onGoingTasks,
        completedTasks: userTasks.completedTasks,
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
