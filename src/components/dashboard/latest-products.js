/* eslint-disable react/jsx-max-props-per-line */
import { formatDistanceToNow, subHours } from "date-fns";
import { v4 as uuid } from "uuid";
import { Box, Button, Modal, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Select from "react-select";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "1px solid rgba(105, 110, 255, 0.2)",
  boxShadow: 24,
};
const smallerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "1px solid rgba(105, 110, 255, 0.2)",
  boxShadow: 24,
};

export const LatestProducts = (props) => {
  const [showAccDetails, setShowAccDetails] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [scroll, setScroll] = React.useState("paper");
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const [openSecondModal, setopenSecondModal] = React.useState(false);
  const handleopenSecondModal = () => setopenSecondModal(true);
  const handlecloseSecondModal = () => setopenSecondModal(false);

  const descriptionElementRef1 = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  function closeModals() {
    setopenSecondModal(false);
    setOpen(false);
  }
  function closeModals1() {
    setopenSecondModal(true);
    setOpen(false);
  }
  const [value, setValue] = React.useState(0);
  const options = [
    { value: "2086078162 - UBA", label: "2086078162 - UBA" },
    { value: "2086034462 - GTB", label: "2086034462 - UBA" },
    { value: "1557078162 - POLARIS", label: "1557078162 - POLARIS" },
  ];
  const customStyles = {
    indicatorSeparator: () => ({
      // none of react-select's styles are passed to <Control />
      border: 0,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      border: "1px solid #DFE0EB",
      display: "flex",
      borderRadius: "8px",
      marginTop: "10px",
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
  return (
    <>
      <Button
        component="a"
        disableRipple
        style={{ paddingTop: "25px", paddingBottom: "25px" }}
        sx={{
          backgroundColor: "#2F2E40",
          borderRadius: "10px",
          color: "#fff",
          fontWeight: "fontWeightBold",
          justifyContent: "flex-start",
          px: 3,
          border: "1px solid #2F2E40",
          textAlign: "center",
          textTransform: "none",
          width: "100%",
          marginTop: "30px",
          marginBottom: "30px",
          "& .MuiButton-startIcon": {
            color: "#fff",
            fontSize: "25px !important",
          },

          "&:hover": {
            backgroundColor: "#fff !important",
            color: "#2F2E40",
            "& .MuiButton-startIcon": {
              color: "#2F2E40",
            },
          },
        }}
        onClick={handleOpen}
      >
        <Box
          sx={{ flexGrow: 1 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <LocalAtmIcon style={{ marginRight: "15px" }} />
          <Typography variant="overline2">Withdraw your earnings</Typography>
        </Box>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Box className="acct_names">
              <div className="add_acc_modal">
                <div style={{ padding: "20px" }} className="add">
                  <Typography variant="h5" className="">
                    Withdraw Earnings
                  </Typography>
                  <img
                    src="./cancel.svg"
                    alt="cancel"
                    style={{ cursor: "pointer" }}
                    width="38px"
                    onClick={handleClose}
                  />
                </div>

                <hr className="hr_with" />

                <div className="add_inputs">
                  <div className="add_input ">
                    <label htmlFor="withdraw">Withdraw to</label> <br />
                    <Select
                      styles={customStyles}
                      options={options}
                      theme={(theme) => ({
                        ...theme,

                        colors: {
                          ...theme.colors,
                          primary25: "#f2e9c4",
                          primary: "#2f2e40",
                          neutral5: "#DFE0EB",
                          primary50: "#f2e9c4",
                        },
                      })}
                    />
                  </div>
                  <div className="add_input ">
                    <label htmlFor="Old password">Amount</label> <br />
                    <div
                      className="input_wrap"
                      style={{
                        position: "relative",
                      }}
                    >
                      <input type="number" />
                      <span className="max_withdraw">Max </span>
                    </div>
                  </div>

                  <button onClick={closeModals1}>Withdraw Funds</button>
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
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef1}
            tabIndex={-1}
          >
            <Box className="">
              <div className="response">
                <div className="modal_resp">
                  <div className="top">
                    <div className="icon">
                      {" "}
                      <img src="./gott.svg" />
                    </div>

                    <Typography variant="h5" className="">
                      Your withdrawal has been processed
                    </Typography>
                  </div>

                  <p className="desc">
                    Your selected amount is being sent to your provided bank details and would be
                    delivered in no time. You can exit this page.
                  </p>

                  <button onClick={closeModals}>Back to dashboard</button>
                </div>
              </div>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
