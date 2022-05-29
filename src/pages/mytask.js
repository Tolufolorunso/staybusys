import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import SavedSearchOutlinedIcon from "@mui/icons-material/SavedSearchOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import VerticalSplitOutlinedIcon from "@mui/icons-material/VerticalSplitOutlined";

import { DashboardLayout } from "../components/dashboard-layout";

const Task = () => (
  <>
    <Head>
      <title>Task | Material Kit</title>
    </Head>
    {/* <h1 style={{marginTop:"20px"}}>
      My task page
    </h1> */}

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
              height:'50px',
              padding:'1rem',
              fontWeight: "700",
              color: "#2F2E40",
              fontSize: "2px",
              lineHeight: "130%",
              border: "1px solid #FDA741",
              borderRadius: "10px",
            }}
          />
          <VerticalSplitOutlinedIcon
            style={{
              width: "50px",
              height:'50px',
              padding:'1rem',

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
  </>
);

Task.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Task;
