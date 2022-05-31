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
import { DashboardLayout } from "../components/dashboard-layout";
export default function Task() {
  const [viewMode, setviewMode] = React.useState('');


  function changeToGridDisplay() {
    console.log("Change Display");
    const getDisplay = document.querySelector('.grids_sec')
    if (getDisplay.classList.contains('displayGrid')){
      getDisplay.classList.remove('displayGrid')
      localStorage.removeItem("viewMode", "displayGrid");
    }else{
      getDisplay.classList.add('displayGrid')
      localStorage.setItem("viewMode", "displayGrid");
      const view = localStorage.getItem('viewMode')
      setviewMode(view)
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
              <div className="input_wrap_top">
                <SavedSearchOutlinedIcon />
                <input type="text" placeholder="Task type, description and keywords" />
              </div>
              <div className="input_wrap_top">
                <AddLocationAltOutlinedIcon />
                <input type="text" placeholder="Location" />
              </div>
              <div className="input_wrap_top">
                <PaidOutlinedIcon />
                <input type="text" placeholder="Payment" />
              </div>

              <button>Search</button>
            </div>

            <div className="sort">
              <p>
                <span>90</span> tasks found
              </p>

              <div className="buttons">
                <select name="" id="">
                  <option value="">Sort by: Relevance</option>
                </select>
                <FilterAltOutlinedIcon
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
                <VerticalSplitOutlinedIcon
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
          <div className={viewMode === 'displayGrid' ? 'grids_sec container displayGrid' : 'grids_sec container'}>
            {tasksList.map((task, index) => (
              <div className="tasks">
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