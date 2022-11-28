import Head from "next/head";
import * as React from "react";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import { tasksList } from "src/__mocks__/tasksList";
import Select from "react-select";
import { DashboardLayout } from "../components/dashboard-layout";
import Modal from "@mui/material/Modal";
import { fetchJson } from "lib/api";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import { API_URI } from "../../lib/contant";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "auto",
  transform: "translate(-50%, -50%)",
  // display:'flex',
  // justifyContent:'center',
  // alignItems:'center',
  // margin:'0 auto',
  width: "50%",

  maxWidth: "900px",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: "0px 7px 20px rgba(145, 156, 212, 0.15)",
  // border: "1px solid rgba(255, 204, 0, 0.2)",
  // borderRadius: "10px 10px 0 0",
  p: 4,
};

export default function Task(props) {
  const { accessToken, user } = props;
  console.log(user);
  const [viewMode, setviewMode] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSecondModal, setopenSecondModal] = React.useState(false);
  const handlecloseSecondModal = () => setopenSecondModal(false);
  function closeModals() {
    setopenSecondModal(false);
    setOpen(false);
  }

  const [tasksList, setTasksList] = useState([]);
  const [taskDetail, settaskDetail] = useState(null);

  const { data } = useSession();

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetchJson("/api/tasks", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ token: data?.user?.token }),
      });
      setTasksList(res.tasks || []);
    }
    fetchTasks();
  }, []);

  const selectedBtns = [];

  function chooseTask(btnNumber) {
    const allTasks = document.querySelectorAll(".choose_btn");
    allTasks.forEach((btn, index) => {
      if (btnNumber === index) {
        // btn.classList.remove("active");

        btn.classList.toggle("active");
        if (btn.classList.contains("active")) {
          // selectedBtns.push(btn);
          //   console.log(selectedBtns);
          if (selectedBtns.length <= 3) {
            selectedBtns.push(btn);
          } else {
            toast.error("You can no longer add new tasks");
            btn.classList.remove("active");
            return;
          }
        }
        selectedBtns.forEach((arrBtn) => {
          if (!arrBtn.classList.contains("active")) {
            selectedBtns.pop(arrBtn);
          }
        });
      }
    });
  }
  const options = [
    { value: "Newest", label: "Sort by: Newest" },
    { value: "Oldest", label: "Sort by: Oldest" },
  ];
  const customStyles = {
    indicatorSeparator: () => ({
      // none of react-select's styles are passed to <Control />
      border: 0,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      border: "1px solid #FDA741",
      display: "flex",
      borderRadius: "8px",
      height: "50px",
      paddingRight: "12px",
      paddingLeft: "12px",
      fontFamily: "Euclid Circular A",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "140%",
      /* or 25px */

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

  function changeToGridDisplay(e) {
    console.log("Change Display");
    console.log(e.target.src);
    const getDisplay = document.querySelector(".grids_sec");
    if (getDisplay.classList.contains("displayGrid")) {
      getDisplay.classList.remove("displayGrid");

      localStorage.removeItem("viewMode", "displayGrid");
      e.target.src = "./list.svg";
    } else {
      getDisplay.classList.add("displayGrid");
      localStorage.setItem("viewMode", "displayGrid");
      const view = localStorage.getItem("viewMode");
      e.target.src = "./grid.svg";

      setviewMode(view);
    }
  }

  function readMoreHandler(id) {
    const task = tasksList.find((task) => task._id === id);
    settaskDetail(task);
    setopenSecondModal(true);
  }

  async function acceptHandler(id) {
    const url = `${API_URI}/tasks/${id}/accept`;

    try {
      const res = await fetchJson(url, {
        method: "PATCH",
        headers: { authorization: `Bearer ${props.accessToken}` },
      });

      if (res.status) {
        setTasksList(function () {
          return tasksList.filter((task) => task._id !== id);
        });
      }

      if (!res.status) {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(error.message);

    }
  }

  async function declineHandler(id) {
    const url = `${API_URI}/tasks/${id}/decline`;

    try {
      const res = await fetchJson(url, {
        method: "PATCH",
        headers: { authorization: `Bearer ${props.accessToken}` },
      });

      if (res.status) {
        setTasksList(function () {
          return tasksList.filter((task) => task._id !== id);
        });
      }

      if (!res.status) {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const titleDescriptionRef = React.useRef();
  const locationRef = React.useRef();
  const paymentRef = React.useRef();
  const minPriceRef = React.useRef();
  const maxPriceRef = React.useRef();
  const [sort, setSort] = useState("Old");

  async function handleopenSecondModal() {
    let url = `${API_URI}/tasks?`;
    const price1 = minPriceRef.current.value;
    const price2 = maxPriceRef.current.value;

    let tags = ''
    selectedBtns.forEach((btn) => {
      tags += `${btn.innerText},`
    })

    const titleDescription = titleDescriptionRef.current.value;
    const location = locationRef.current.value;
    const price = paymentRef.current.value;

    url = `${url}tagFilter=${tags}&title=${titleDescription}&location=${location}&price=${price}&sort=${sort}`;

    if(price1 && price2) {
      url = `${url}&priceFilter[gte]=${price1}&priceFilter[lte]=${price2}`
    }
    try {
      const res = await fetchJson(url, {
        method: "GET",
        headers: { authorization: `Bearer ${props.accessToken}` },
      });

      console.log(234, res.tasks);

      if (res.status) {
        setTasksList(res.tasks);
      }

      if (!res.status) {
        throw new Error(res.message);
      }
    } catch (error) {
      console.log(error.message); // show error message
    }
    closeModals()
  }

  const sortHandler = (e) => {
    console.log(e.value);
    setSort(e.value);
    searchOneHandler();
  };

  async function searchOneHandler() {
    let url = `${API_URI}/tasks?`;

    const titleDescription = titleDescriptionRef.current.value;
    const location = locationRef.current.value;
    const price = paymentRef.current.value;

    url = `${url}title=${titleDescription}&location=${location}&price=${price}&sort=${sort}`;

    try {
      const res = await fetchJson(url, {
        method: "GET",
        headers: { authorization: `Bearer ${props.accessToken}` },
      });

      console.log(res.tasks);

      if (res.status) {
        setTasksList(res.tasks);
      }

      if (!res.status) {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="tasks_page">
        <Head>
          <title>Tasks | Stay busy</title>
        </Head>
        <ToastContainer />
        <div className="container">
          <div className="top_btns">
            <div className="top_btns_wrapper">
              <Grid container spacing={1}>
                <Grid item style={{ paddingLeft: "3px " }} xs={12} sm={12} md={12} lg={4.7}>
                  <div className="input_wrap_top">
                    <img src="../search.svg" style={{ padding: "1rem", paddingRight: "0px" }} />
                    <input
                      type="text"
                      placeholder="Task type, description and keywords"
                      style={{ width: "100%", padding: "1rem", paddingLeft: "0" }}
                      ref={titleDescriptionRef}
                    />
                  </div>
                </Grid>
                <Grid item style={{ paddingLeft: "3px " }} xs={12} sm={6} md={6} lg={3}>
                  <div className="input_wrap_top">
                    <img src="../loaction.svg" style={{ padding: "1rem", paddingRight: "0px" }} />
                    <input
                      type="text"
                      placeholder="Location"
                      style={{ width: "100%", padding: "1rem", paddingLeft: "0" }}
                      ref={locationRef}
                    />
                  </div>
                </Grid>
                <Grid item style={{ paddingLeft: "3px " }} xs={12} sm={6} md={6} lg={3}>
                  <div className="input_wrap_top">
                    <img src="../dollar.svg" style={{ padding: "1.1rem", paddingRight: "0px" }} />
                    <input
                      type="text"
                      placeholder="Payment"
                      style={{ width: "100%", padding: "1rem", paddingLeft: "0" }}
                      ref={paymentRef}
                    />
                  </div>
                </Grid>
                <Grid item style={{ paddingLeft: "0px " }} xs={12} sm={12} md={1} lg={1}>
                  <button onClick={searchOneHandler}>Search</button>
                </Grid>
              </Grid>
            </div>

            <div className="sort">
              <p>
                <span>{tasksList.length}</span> tasks found
              </p>

              <div className="buttons">
                <Select
                  styles={customStyles}
                  options={options}
                  onChange={sortHandler}
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
                <img
                  onClick={handleOpen}
                  src="../filter.svg"
                  style={{
                    width: "50px",
                    height: "50px",
                    padding: "1rem",
                    fontWeight: "700",
                    color: "#2F2E40",
                    fontSize: "2px",
                    lineHeight: "130%",
                    border: "1px solid #FDA741",
                    borderRadius: "10px",
                  }}
                />
                <img
                  src={changeToGridDisplay ? "../grid.svg" : "./list.svg"}
                  onClick={changeToGridDisplay}
                  style={{
                    width: "50px",
                    height: "50px",
                    padding: "1rem",

                    fontWeight: "700",
                    color: "#2F2E40",
                    fontSize: "13px",
                    lineHeight: "130%",
                    border: "1px solid #FDA741",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal_box" sx={style}>
              <div className="filter_modal">
                <div className="filter_modal_desc">
                  <div className="modal_secions">
                    <div className="section_one">
                      <div className="modal_sections_hold">
                        <span>Tags</span>
                      </div>
                      <div className="modal_sections_hold_btn">
                        <div className="buttons">
                          {user.tags.map((tag, index) => (
                            <button
                              key={index}
                              onClick={() => chooseTask(index)}
                              className="choose_btn 0"
                            >
                              {tag}
                            </button>
                          ))}


                        </div>
                      </div>
                    </div>

                    <hr className="modal_secions_hr" />

                    <div className="section_two">
                      <div className="modal_sections_hold">
                        <span>Date</span>
                      </div>

                      <div className="filter_inputs">
                        <div className="input">
                          <input type="date" placeholder="2022-01-01" />
                          <DateRangeIcon style={{ color: "#DCDCDC" }} />
                        </div>
                        <div className="span"></div>
                        <div className="input">
                          <input type="text" placeholder="Today" />
                          <DateRangeIcon style={{ color: "#DCDCDC" }} />
                        </div>
                      </div>
                    </div>
                    <hr className="modal_secions_hr" />

                    <div className="section_two">
                      <div className="modal_sections_hold">
                        <span>Price</span>
                      </div>

                      <div className="filter_inputs">
                        <div className="input">
                          <input type="text" placeholder="Min price" ref={minPriceRef}/>
                          <AttachMoneyIcon style={{ color: "#DCDCDC" }} />
                        </div>
                        <div className="span"></div>
                        <div className="input">
                          <input type="text" placeholder="Max Price" ref={maxPriceRef}/>
                          <AttachMoneyIcon style={{ color: "#DCDCDC" }} />
                        </div>
                      </div>
                    </div>

                    <hr className="modal_secions_hr" />

                    <div className="filter_btns">
                      <button className="clear">Clear all filters</button>
                      <div className="dbl_btns">
                        <button onClick={handleClose} className="cancel">
                          Cancel
                        </button>
                        <button onClick={handleopenSecondModal} className="apply">
                          Apply Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
          <Modal
            open={openSecondModal}
            onClose={handlecloseSecondModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="filter_modal">
                <div className="filter_modal_desc">
                  <div className="modal_secions">
                    <div className="research">
                      <span className="open_text">Research</span>
                      <span className="square"></span>
                    </div>

                    <p className="header_text">{taskDetail?.title}</p>
                    <p className="desc">{taskDetail?.description}</p>

                    <div className="filter_btns second_filter_btns">
                      <p>399£</p>
                      <div className="dbl_btns">
                        <button className="cancel" onClick={() => declineHandler(taskDetail?._id)}>
                          Decline
                        </button>
                        <button className="apply" onClick={() => acceptHandler(taskDetail?._id)}>
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
          {/* {viewMode} */}
          <div
            className={
              viewMode === "displayGrid" ? "grids_sec container displayGrid" : "grids_sec container"
            }
          >
            {tasksList.map((task, index) => {
              return (
                <div className="tasks" key={task._id}>
                  <div className="end">
                    <span className="design">{task.tag}</span>
                    <span className="price">{task.price}£</span>
                  </div>
                  <p className="font-face-gm">{task.title}</p>

                  <div className="details">
                    <small className="font-face-text-big">
                      {task.description.slice(0, 200) + "..."}
                    </small>
                  </div>
                  <div className="grid_sec_btns">
                    <button className="read_more" onClick={() => readMoreHandler(task._id)}>
                      Read More
                    </button>
                    <div className="grid_sec_two_btns">
                      <button className="decline" onClick={() => declineHandler(task?._id)}>
                        Decline
                      </button>
                      <button className="accept" onClick={() => acceptHandler(task?._id)}>
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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

  return {
    props: {
      ...session,
    },
  };
}
