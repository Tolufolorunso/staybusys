import Head from "next/head";
import * as React from "react";
import { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
// import tasks from "../../data/task_list";
import "react-toastify/dist/ReactToastify.css";

import { getTags } from "../../lib/get-tags";

import Layout from "src/components/Layout";

const selectedTasks = [];

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  bgcolor: "#F7F4EF",
  borderRadius: "7px",
  marginTop:"100px"
};

const Choosetasks = (props) => {
  const { tags } = props;
  //   const [selectedBtns, setSelectedBtns] = useState([]);
  const [loading, setLoading] = useState(false);

  // function proceed() {
  //   console.log("Proceed");
  // }
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
      if (selectedTasks.length > 3) return;
      selectedTasks.push(task);
      // toast.error("You can select only 4 tasks");
      event.currentTarget.classList.add("is__selected");
    }
  };

  const proceedHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedTasks.length) {
      toast.error("Make a selection to proceed");
      // console.log(error.message)
      // alert("Make a selection to proceed");
      setLoading(false);
      return;
    }
    const personalDetailLS =
      (localStorage && JSON.parse(localStorage.getItem("personaldetails"))) || "";
    personalDetailLS.tags = selectedTasks.join(",");
    console.log(personalDetailLS);
    localStorage.setItem("personaldetails", JSON.stringify(personalDetailLS));
    toast.success("Tasks added successfully");
    router.push("/profileImage");
  };
  const router = useRouter();

  return (
    <>
      <Head>
        <title> Task Preference | Staybusy.io</title>
      </Head>

      <ToastContainer />
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
              <span className={"update__profile update__profile_counter_2"}>2/3</span>
            </Box>
          </Grid>
          <div className="choose_tasks" >
            <div className="buttons">
              <Grid container spacing={3}>
                {tags &&
                  tags.length > 0 &&
                  tags.map((tag) => (
                    <Grid item xs={6} sm={4} md={3} lg={2.4} key={tag._id}>
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        data-task={tag.tag}
                        className={`task__list ${
                          selectedTasks.includes(tag._id) ? "is__selected" : ""
                        }`}
                        onClick={handleSelect}
                      >
                        {tag.tag}
                      </Button>
                    </Grid>
                  ))}
              </Grid>
            </div>
          </div>
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
    </>
  );
};

export default Choosetasks;

export async function getStaticProps() {
  const tags = await getTags();

  return {
    props: {
      tags: tags,
    },
    revalidate: 20000,
  };
}
