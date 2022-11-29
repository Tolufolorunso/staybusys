// import { useMediaQuery } from '@material-ui/core'
import { Button, InputBase, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Section1() {
  // const [value, setValue] = React.useState("");
  const mobile = useMediaQuery("(max-width:800px)");
  return (
    <div className="roothome homepage"
     style={{ textAlign: "center" }}>
      {mobile ? (
        ""
      ) : (
        <>
          <img src="../../roll7.png" 
          className="roll6"
           alt="" />
          <img src="./starhome.svg" 
          alt="" />{" "}
        </>
      )}

      <Typography className="header">
        Easily Connecting <span style={{ color: "#FF6685" }}>College Students </span> with{" "}
        <span className="wrappers">Paying Tasks</span>{" "}
      </Typography>
      <Typography className="homepageDetails">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
        consequat duis enim velit mollit. Exercitation veniam consequat.
      </Typography>

      {mobile ? (
        <form className="form" noValidate autoComplete="off" style={{ position: "relative" }}>
          <Box className="homeForm" style={{ position: "relative" }}>
            <InputBase
              type="email"
              className="textField"
              variant="outlined"
              // value={value}
              // onChange={(e, value) => setValue(value)}
              placeholder="Enter your student email"
            />
            <Button href=" /register" className="button_enroll0" variant="contained">
              Register
            </Button>
          </Box>
        </form>
      ) : (
        <form className="form" noValidate autoComplete="off" style={{ position: "relative" }}>
          <Box className="homeForm" style={{ position: "relative" }}>
            <InputBase
              type="email"
              className="textField"
              variant="outlined"
              // value={value}
              // onChange={(e, value) => setValue(value)}
              placeholder="Enter your student email"
            />
            <Button href=" /register" className="button_enroll" variant="contained">
              Register
            </Button>
          </Box>
        </form>
      )}
      {mobile ? (
        ""
      ) : (
        <>
          <img src="../../roll6.png" className="roll7" alt="" />{" "}
        </>
      )}
    </div>
  );
}

export default Section1;
