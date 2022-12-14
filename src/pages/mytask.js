/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-props-per-line */
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
import { fetchJson, fetchTasks } from "lib/api";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import { API_URI } from "../../lib/contant";
import { filterTask, padPrice } from "../../lib/filter";

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
  const { user, error, tasks: taskArr } = props;

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [viewMode, setviewMode] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [scroll, setScroll] = React.useState("paper");

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
  useEffect(() => {
    // async function fetchTasks() {
    //   const res = await fetchJson("/api/tasks", {
    //     method: "POST",
    //     headers: { "Content-type": "application/json" },
    //     body: JSON.stringify({ token: data?.user?.token }),
    //   });
    //   setTasksList(res.tasks || []);
    // }
    // fetchTasks();
    setTasksList(taskArr);
  }, []);

  // const selectedBtns = [];

  function chooseTas(e) {
    // const allTasks = document.querySelectorAll(".choose_btn");
    // allTasks.forEach((btn, index) => {
    //   if (btnNumber === index) {
    //     // btn.classList.remove("active");
    //     btn.classList.toggle("active");
    //     if (btn.classList.contains("active")) {
    //       // selectedBtns.push(btn);
    //       if (selectedBtns.length <= 3) {
    //         selectedBtns.push(btn);
    //       } else {
    //         toast.error("You can no longer add new tasks");
    //         btn.classList.remove("active");
    //         return;
    //       }
    //     }
    //     selectedBtns.forEach((arrBtn) => {
    //       if (!arrBtn.classList.contains("active")) {
    //         selectedBtns.pop(arrBtn);
    //       }
    //     });
    //   }
    // });
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
    setLoading1(true);
    try {
      const res = await fetchJson(url, {
        method: "PATCH",
        headers: { authorization: `Bearer ${props.accessToken}` },
      });

      if (res.status) {
        await fetch("/api/auth/session?update");
        setTasksList(function () {
          toast.success("Task succesfully accepted");
          return tasksList.filter((task) => task._id !== id);
        });
      }

      if (!res.status) {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading1(false);
    closeModals();
  }

  async function declineHandler(id) {
    const url = `${API_URI}/tasks/${id}/decline`;
    setLoading(true);
    try {
      const res = await fetchJson(url, {
        method: "PATCH",
        headers: { authorization: `Bearer ${props.accessToken}` },
      });

      if (res.status) {
        toast.success("Task succesfully Declined");
        await fetch("/api/auth/session?update");
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
    setLoading(false);
    closeModals();
  }

  const [sort, setSort] = useState("Old");
  const [selectedBtns, setSelectedBtns] = useState([]);

  const initialFilterTerm = {
    tags: "",
    titleDescription: "",
    location: "",
    price: "",
    startDate: "",
    endDate: "",
    price1: "",
    price2: "",
  };

  const [filterTerm, setFilterTerm] = useState(initialFilterTerm);

  function chooseTask(e) {
    const tag = e.target.textContent;
    if (!selectedBtns.includes(tag)) {
      setSelectedBtns([...selectedBtns, tag]);
    } else {
      setSelectedBtns(() => selectedBtns.filter((t) => t !== tag));
    }
  }

  function handleFilterChange(e) {
    setFilterTerm({ ...filterTerm, [e.target.name]: e.target.value });
  }

  function filterFunction() {
    let url = `${API_URI}/tasks?`;
    url = `${url}title=${filterTerm.titleDescription}&location=${filterTerm.location}&price=${filterTerm.price}&sort=${sort}`;

    let tags = selectedBtns.join(",");
    url = `${url}&tagFilter=${tags}`;

    const price1 = padPrice(filterTerm.price1);
    const price2 = padPrice(filterTerm.price2);

    if (price1 && price2) {
      url = `${url}&priceFilter[gte]=${price1}&priceFilter[lte]=${price2}`;
    } else if (price1) {
      url = `${url}&priceFilter[gte]=${price1}`;
    } else if (price2) {
      url = `${url}&priceFilter[lte]=${price2}`;
    }

    if (filterTerm.startDate && filterTerm.endDate) {
      url = `${url}&date[start]=${filterTerm.startDate}&date[end]=${filterTerm.endDate}`;
    } else if (filterTerm.startDate) {
      url = `${url}&date[start]=${filterTerm.startDate}`;
    } else if (filterTerm.endDate) {
      url = `${url}&date[end]=${filterTerm.endDate}`;
    }

    filterTask(url, setTasksList, props, toast);
  }

  function filterTasks(e) {
    e.preventDefault();
    filterFunction();
    closeModals();
  }

  function handleClearFilters() {
    setSelectedBtns([]);
    setFilterTerm({ ...filterTerm, startDate: "", endDate: "", price1: "", price2: "" });

    selectedBtns.length = 0;

    if (selectedBtns.length === 0) {
      filterFunction();
    }
    // closeModals();
  }

  // async function handleopenSecondModal(e) {
  //   e.preventDefault();
  //   let url = `${API_URI}/tasks?`;
  //   const price1 = padPrice(minPriceRef.current.value);
  //   const price2 = padPrice(maxPriceRef.current.value);
  //   const startDate = startDateRef.current.value;
  //   const endDate = endDateRef.current.value;

  //   let tags = "";
  //   selectedBtns.forEach((btn) => {
  //     tags += `${btn.innerText},`;
  //   });

  //   const titleDescription = titleDescriptionRef.current.value;
  //   const location = locationRef.current.value;
  //   const price = paymentRef.current.value;

  //   url = `${url}tagFilter=${tags}&title=${titleDescription}&location=${location}&price=${price}&sort=${sort}`;

  //   if (price1 && price2) {
  //     url = `${url}&priceFilter[gte]=${price1}&priceFilter[lte]=${price2}`;
  //   } else if (price1) {
  //     url = `${url}&priceFilter[gte]=${price1}`;
  //   } else if (price2) {
  //     url = `${url}&priceFilter[lte]=${price2}`;
  //   }

  //   if (startDate && endDate) {
  //     url = `${url}&date[start]=${startDate}&date[end]=${endDate}`;
  //   } else if (startDate) {
  //     url = `${url}&date[start]=${startDate}`;
  //   } else if (endDate) {
  //     url = `${url}&date[end]=${endDate}`;
  //   }

  //   filterTask(url, setTasksList, props);
  //   closeModals();
  // }

  const sortHandler = (e) => {
    setSort(e.value);
    filterFunction();
  };

  useEffect(() => {
    fetch("/api/auth/session?update");
  }, []);

  return (
    <>
      <div className="tasks_page">
        <Head>
          <title>Tasks | Staybusy.io</title>
        </Head>
        <ToastContainer />
        <div className="container">
          <div className="top_btns">
            <div className="top_btns_wrapper">
              <Grid container spacing={1}>
                <Grid item style={{ paddingLeft: "3px " }} xs={12} sm={12} md={12} lg={4}>
                  <div className="input_wrap_top">
                    <img src="../search.svg" style={{ padding: "1rem", paddingRight: "0px" }} />
                    <input
                      type="text"
                      placeholder="Task type, description and keywords"
                      style={{ width: "100%", padding: "1rem", paddingLeft: "0" }}
                      name="titleDescription"
                      onChange={handleFilterChange}
                      value={filterTerm.titleDescription}
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
                      name="location"
                      onChange={handleFilterChange}
                      value={filterTerm.location}
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
                      name="price"
                      onChange={handleFilterChange}
                      value={filterTerm.price}
                    />
                  </div>
                </Grid>
                <Grid item style={{ paddingLeft: "0px " }} xs={12} sm={12} md={1} lg={1}>
                  <button onClick={filterTasks}>Search</button>
                </Grid>
              </Grid>
            </div>

            <div className="sort">
              <p>
                {!error && <span>{tasksList.length}</span>} {!error && " tasks found"}
              </p>

              <div className="buttons">
                <Select
                  styles={customStyles}
                  options={options}
                  onChange={sortHandler}
                  defaultValue={options[0].label}
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
                ref={descriptionElementRef2}
                tabIndex={-1}
              >
                <Box className="modal_box" component="form">
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
                                  type="button"
                                  key={index}
                                  // onClick={(e) => chooseTask(index)}
                                  onClick={(e) => chooseTask(e)}
                                  className={`choose_btn 0 ${
                                    selectedBtns.includes(tag) ? "active" : ""
                                  }`}
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
                              <input
                                type="date"
                                placeholder="2022-01-01"
                                style={{ width: "100%" }}
                                name="startDate"
                                onChange={handleFilterChange}
                                value={filterTerm.startDate}
                              />
                            </div>
                            <div className="span"></div>
                            <div className="input">
                              <input
                                type="date"
                                placeholder="Today"
                                name="endDate"
                                onChange={handleFilterChange}
                                value={filterTerm.endDate}
                                style={{ width: "100%" }}
                              />
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
                              <input
                                type="text"
                                placeholder="Min price"
                                name="price1"
                                onChange={handleFilterChange}
                                value={filterTerm.price1}
                              />
                              <AttachMoneyIcon style={{ color: "#DCDCDC" }} />
                            </div>
                            <div className="span"></div>
                            <div className="input">
                              <input
                                type="text"
                                placeholder="Max Price"
                                name="price2"
                                onChange={handleFilterChange}
                                value={filterTerm.price2}
                              />
                              <AttachMoneyIcon style={{ color: "#DCDCDC" }} />
                            </div>
                          </div>
                        </div>

                        <hr className="modal_secions_hr" />

                        <div className="filter_btns">
                          <button className="clear" type="reset" onClick={handleClearFilters}>
                            Clear all filters
                          </button>
                          <div className="dbl_btns">
                            <button onClick={handleClose} className="cancel" type="button">
                              Cancel
                            </button>
                            <button onClick={filterTasks} className="apply">
                              Apply Filter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </DialogContentText>
            </DialogContent>
          </Dialog>
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
                        <p>{taskDetail?.price}</p>
                        <div className="dbl_btns">
                          <LoadingButton
                            loading={loading}
                            loadingPosition="end"
                            className="cancel"
                            variant="outline"
                            onClick={() => declineHandler(taskDetail?._id)}
                          >
                            Decline
                          </LoadingButton>
                          <LoadingButton
                            loading={loading1}
                            variant="contained"
                            className="apply"
                            loadingPosition="end"
                            onClick={() => acceptHandler(taskDetail?._id)}
                          >
                            Accept
                          </LoadingButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
          {/* {viewMode} */}
          <div
            className={
              viewMode === "displayGrid" ? "grids_sec container displayGrid" : "grids_sec container"
            }
          >
            {error ? (
              <h2>{error}</h2>
            ) : (
              tasksList.map((task, index) => {
                return (
                  <div className="tasks" key={task._id}>
                    <div className="end">
                      <span className="design">{task.tag}</span>
                      <span className="price">{task.price}??</span>
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
                        <LoadingButton
                          loading={loading}
                          loadingPosition="end"
                          className="decline"
                          onClick={() => declineHandler(task?._id)}
                        >
                          Decline
                        </LoadingButton>
                        <LoadingButton
                          loading={loading1}
                          variant="contained"
                          loadingPosition="end"
                          className="accept"
                          onClick={() => acceptHandler(task?._id)}
                        >
                          Accept
                        </LoadingButton>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
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

  try {
    const tasks = await fetchTasks(session?.user?.accessToken, `${API_URI}/tasks`);

    return {
      props: {
        ...session,
        tasks: tasks.tasks,
      },
    };
  } catch (error) {
    return {
      props: {
        ...session,
        tasks: [],
        error: error.message,
      },
    };
  }
}
