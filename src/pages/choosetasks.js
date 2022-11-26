import Head from "next/head";
import * as React from "react";
import { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";
import tasks from "../../data/task_list";

import Layout from "src/components/Layout";

const selectedTasks = [];

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  bgcolor: "#F7F4EF",
  borderRadius: "7px",
};

const Choosetasks = () => {
  //   const [selectedBtns, setSelectedBtns] = useState([]);
  const [loading, setLoading] = useState(false);

  function proceed() {
    console.log("Proceed");
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
    if(selectedTasks.length > 3) return
      selectedTasks.push(task);
      event.currentTarget.classList.add("is__selected");
    }
    console.log(selectedTasks);
  };

  const proceedHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedTasks.length) {
    //   toast.error("Make a selection to proceed");
    alert('Make a selection to proceed')
      setLoading(false);
      return;
    }
    const personalDetailLS = localStorage && JSON.parse(localStorage.getItem("personaldetails")) || "";
    personalDetailLS.tags = selectedTasks.join(',')
    console.log(personalDetailLS)
    localStorage.setItem('personaldetails', JSON.stringify(personalDetailLS))
    router.push("/profileImage");
  };
  const router = useRouter();

  return (
    <>
      <Head>
        <title> Task Preference | Staybusy.io</title>
      </Head>
      <Layout>
        <Grid container sx={containerStyle} className="form__container">
          <Grid item sm={12}>
            <Grid item sm={12}>
              <Box sx={{ position: "relative" }}>
                <Grid item sm={8} sx={{ mx: "auto" }}>
                  <h5
                    className="form__container_heading"
                    style={{ width: "60%", margin: "10px auto" }}
                  >
                    Choose the types of tasks You’re comfortable with from the list below
                  </h5>
                </Grid>
                <span className={"update__profile update__profile_counter_3"}>2/3</span>
              </Box>
            </Grid>

            <Grid container md={8} xs={12} sx={{ mx: "auto", my: 4 }} spacing={6}>
              {tasks &&
                tasks.length > 0 &&
                tasks.map((taskList) => (
                  <Grid item xs={2} sm={4} md={3} key={taskList.id}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      data-task={taskList.title}
                      className={`task__list ${
                        selectedTasks.includes(taskList.id) ? "is__selected" : ""
                      }`}
                      onClick={handleSelect}
                    >
                      {taskList.title}
                    </Button>
                  </Grid>
                ))}
            </Grid>

            <Grid item md={8} xs={12} sx={{ mx: "auto" }}>
              <Box component="form" noValidate onSubmit={proceedHandler}>
                <Grid container justifyContent="center">
                  <Grid item sm={6} sx={{ mt: 4 }}>
                    <LoadingButton
                      loading={loading}
                      type="submit"
                      size="large"
                      variant="contained"
                      loadingPosition="end"
                      className="default__button"
                      fullWidth
                    >
                      Proceed
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Choosetasks;
