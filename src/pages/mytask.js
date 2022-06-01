import Head from "next/head";
import * as React from "react";
import { useState } from "react";
import { Box, Container, Grid, Pagination } from "@mui/material";
import SavedSearchOutlinedIcon from "@mui/icons-material/SavedSearchOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import VerticalSplitOutlinedIcon from "@mui/icons-material/VerticalSplitOutlined";
import { tasksList } from "src/__mocks__/tasksList";
import Select from "react-select";
import { DashboardLayout } from "../components/dashboard-layout";
export default function Task() {
  const [viewMode, setviewMode] = React.useState("");
  const options = [
    { value: "Relevance", label: "Sort by: Relevance" },
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
      color:"#2F2E40 !important"
    }),
    dropdownIndicator: () => ({
      color:"#2F2E40 !important",
      marginTop:"13px"
    }),

  };

  function changeToGridDisplay() {
    console.log("Change Display");
    const getDisplay = document.querySelector(".grids_sec");
    if (getDisplay.classList.contains("displayGrid")) {
      getDisplay.classList.remove("displayGrid");
      localStorage.removeItem("viewMode", "displayGrid");
    } else {
      getDisplay.classList.add("displayGrid");
      localStorage.setItem("viewMode", "displayGrid");
      const view = localStorage.getItem("viewMode");
      setviewMode(view);
    }
  }

  return (
    <>
      <div className="tasks_page">
        <Head>
          <title>Task | Stay busy</title>
        </Head>
        <div className="container">
          <div className="top_btns">
            <div className="top_btns_wrapper">
              <Grid container spacing={1}>
                <Grid item style={{paddingLeft:"3px !important"}} xs={12} sm={12} md={12} lg={4.7}>
                <div className="input_wrap_top">
              <img src="../search.svg" style={{padding:"1rem", paddingRight:"0px"}} />
                <input type="text" placeholder="Task type, description and keywords" style={{width:"100%",padding:"1rem",paddingLeft:"0"}} />
              </div>
                </Grid>
                <Grid item style={{paddingLeft:"3px !important"}} xs={12} sm={6} md={6} lg={3}>
                <div className="input_wrap_top" >
                <img src="../loaction.svg"  style={{padding:"1rem", paddingRight:"0px"}}  />
                <input type="text" placeholder="Location" style={{width:"100%",padding:"1rem",paddingLeft:"0"}} />
              </div>
                </Grid>
                <Grid item style={{paddingLeft:"3px !important"}} xs={12} sm={6} md={6} lg={3}>

              <div className="input_wrap_top">
                <img src="../dollar.svg" style={{padding:"1.1rem", paddingRight:"0px"}}/>
                <input type="text" placeholder="Payment" style={{width:"100%",padding:"1rem",paddingLeft:"0"}}/>
              </div>
                </Grid>
                <Grid item style={{paddingLeft:"0px !important"}} xs={12} sm={12} md={1} lg={1}>
                <button>Search</button>
                </Grid>
              </Grid>




            </div>

            <div className="sort">
              <p>
                <span>90</span> tasks found
              </p>

              <div className="buttons">
                <Select defaultValue={options[1]} styles={customStyles} options={options}  theme={(theme) => ({
      ...theme,

      colors: {
        ...theme.colors,
        primary25: '#f2e9c4',
        primary: '#2f2e40',
        neutral5:"#000",
        primary50:"#f2e9c4"
      },
    })}/>
                <img src="../filter.svg"
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
                <img src={changeToGridDisplay ? "../grid.svg" : "./list.svg"}
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
          {/* {viewMode} */}
          <div
            className={
              viewMode === "displayGrid" ? "grids_sec container displayGrid" : "grids_sec container"
            }
          >
            {tasksList.map((task, index) => (
              <div className="tasks" key={task}>
                <div className="end">
                  <span className="design">{task.status}</span>
                  <span className="price">{task.price}£</span>
                </div>
                <p className="font-face-gm">Auditing information architechture</p>

                <div className="details">
                  <small className="font-face-text-big">
                    Listing out all of the findings from current or existing Informature
                    architechture (IA).
                  </small>
                </div>
                <div className="grid_sec_btns">
                  <button className="read_more">Read More</button>

                  <div className="grid_sec_two_btns">
                    <button className="decline">Decline</button>
                    <button className="accept">Accept</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Task.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
