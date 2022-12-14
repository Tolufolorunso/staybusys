/* eslint-disable react/jsx-max-props-per-line */
import Head from "next/head";
// import React, { useRef, useState } from "react";
import Layout from "src/components/Layout";
import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import CloseIcon from "@mui/icons-material/Close";
import getCroppedImg from "../components/cropimage";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import Modal from "@mui/material/Modal";
import { Box, Grid, Typography } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getSession, signOut, useSession } from "next-auth/react";

import completeProfile from "../../lib/complet-profile";
import PropagateLoader from "react-spinners/PropagateLoader";

import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import { fetchJson } from "lib/api";
import { useAppContext } from "src/context/appContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "78%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid rgba(105, 110, 255, 0.2)",
  boxShadow: "0px 7px 20px rgba(145, 156, 212, 0.15)",
  borderRadius: "7px",
  padding: "3rem",
};
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  bgcolor: "b#F7F4EF",
  borderRadius: "7px",
};

export default function ProfileImage(props) {
  // if(props.user.completed) {

  // }
  const { data } = useSession();
  const [open, setOpen] = useState(false);

  const [highlight, setHighlight] = React.useState(false);
  const [mouseEnter, setMouseEnter] = React.useState(false);
  const [preview, setPreview] = React.useState("");
  const [drop, setDrop] = React.useState(false);
  const [imageFile, setFile] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const router = useRouter();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [scroll, setScroll] = React.useState("paper");
  let [spinner, setSpinner] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const { updateUser } = useAppContext();

  const handleOpen = () => {
    setOpen(true);
  };

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
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  function rotateimageRight() {
    setRotation(rotation + 5);
  }
  function rotateimageLeft() {
    setRotation(rotation - 5);
  }

  useEffect(() => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  }, []);
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageFile, croppedAreaPixels, rotation);
      setCroppedImage(croppedImage);
      setPreview(croppedImage);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  function stopUload() {
    setOpen(false);
    setPreview("");
    setFile("");

    setDrop(false);
  }

  const handleEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMouseEnter(true);

    preview === "" && setHighlight(true);
  };

  const handleOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    preview === "" && setHighlight(true);
  };

  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
    setDrop(true);

    const [file] = e.target.files || e.dataTransfer.files;
    setUserImage(file);
    uploadFile(file);
    setFile(file);
  };

  function uploadFile(file) {
    try {
      const reader = new FileReader();

      reader.readAsBinaryString(file);

      // setFile(file)
      reader.onload = (e) => {
        // this is the base64 data
        const fileRes = btoa(reader.result);

        setFile(`data:image/jpg;base64,${fileRes}`);
        // console.log(`data:image/jpg;base64,${fileRes}`);
        setPreview(`data:image/jpg;base64,${fileRes}`);
      };
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(crop);

    setLoading(true);
    if (!userImage) {
      toast.error("Attach a photo to your profile to proceed");
      // alert("Attach a photo to your profile to proceed");
      setLoading(false);
      return;
    }
    const user = await completeProfile(userImage, data.accessToken);
    if (user.status) {
      updateUser(user.user);
      await fetch("/api/auth/session?update");
      router.push("/dashboard");
      localStorage.removeItem("personaldetails");
    } else {
      toast.error("An error occurred...");
    }
  };
  return (
    <div>
      <Head>
        <title>Upload Picture | Staybusy.io</title>
      </Head>

      {spinner ? (
        <div className="container1">
          {" "}
          <PropagateLoader
            color={"#FFCC00"}
            spinner={spinner}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <ToastContainer />
          <Grid container sx={containerStyle} className="form__container">
            <Grid item sm={12}>
              <Grid item sm={12}>
                <Box sx={{ position: "relative" }}>
                  <Grid item sm={8} sx={{ mx: "auto" }}>
                    <h5 className="form__container_heading"> Attach a photo to your profile</h5>
                  </Grid>
                  <span className={"update__profile update__profile_counter_1"}>3/3</span>
                </Box>
              </Grid>
              <Grid>
                <div className="my_container " component="form" noValidate onSubmit={handleSubmit}>
                  <div className="choose_tasks">
                    <div className="choose">
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="image_upload"></div>
                      </div>
                      <div className="uploadimg_hold">
                        <div
                          onDragEnter={(e) => handleEnter(e)}
                          onDragLeave={(e) => handleLeave(e)}
                          onDragOver={(e) => handleOver(e)}
                          onDrop={(e) => handleUpload(e)}
                          className={`upload${
                            highlight ? " is-highlight" : drop ? " is-drop" : ""
                          }`}
                          style={{ backgroundImage: `url(${preview})` }}
                        >
                          <form onSubmit={(e) => e.preventDefault()} className="upload_form">
                            <BackupOutlinedIcon style={{ fontSize: "75px", color: "lightgray" }} />

                            <p>Drag and Drop image here</p>
                            <div className="upload-button">
                              <input
                                type="file"
                                className={`upload-file ${mouseEnter ? "displayNone" : ""}`}
                                accept="image/*"
                                onChange={(e) => handleUpload(e)}
                              />
                              <button className="button"></button>
                            </div>
                          </form>
                        </div>
                        {!preview ? (
                          ""
                        ) : (
                          <Typography
                            variant="caption2"
                            style={{
                              padding: "20px 0 0",
                              color: "#FF6685",
                              display: "flex",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                            onClick={handleOpen}
                          >
                            {" "}
                            Edit or replace photo
                          </Typography>
                        )}
                      </div>

                      <LoadingButton
                        loading={loading}
                        type="submit"
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                        loadingPosition="end"
                        className="upload_btn actn_btn"
                      >
                        Complete Profile
                      </LoadingButton>

                      <Dialog
                        open={open}
                        onClose={handleClose}
                        image={preview}
                        getCroppedFile={(preview) => {
                          setPreview(preview);
                          handleClose();
                        }}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                      >
                        <DialogContent dividers={scroll === "paper"}>
                          <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                          >
                            <div className="crop">
                              <p>Crop image and upload</p>
                              <span>
                                <CloseIcon
                                  onClick={stopUload}
                                  style={{ fontSize: "40px", cursor: "pointer" }}
                                />
                              </span>
                            </div>
                            <div className="cropContainer1">
                              <Cropper
                                image={imageFile}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                cropShape="round"
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                              />
                            </div>
                            <div className="controls">
                              <div className="sliderContainer">
                                <Slider
                                  value={zoom}
                                  min={1}
                                  max={3}
                                  step={0.1}
                                  aria-labelledby="Zoom"
                                  className="slider"
                                  onChange={(e, zoom) => setZoom(zoom)}
                                />
                              </div>
                              <div className="sliderContainer">
                                <div className="rotateBtns">
                                  <button onClick={rotateimageRight} className="cropButton">
                                    <span>
                                      <RotateRightIcon className="rotate_icon" />
                                    </span>
                                    <span className="roate_text">Rotate Right</span>
                                  </button>
                                  <button onClick={rotateimageLeft} className="cropButton">
                                    <span>
                                      <RotateLeftIcon className="rotate_icon" />
                                    </span>
                                    <span className="roate_text">Rotate Left</span>
                                  </button>
                                </div>
                              </div>
                              <buttom
                                style={{ cursor: "pointer" }}
                                onClick={showCroppedImage}
                                className="cropButtonEnter"
                              >
                                Upload Profile Photo
                              </buttom>
                            </div>
                          </DialogContentText>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  // if (session.user.completed) {
  //   return {
  //     redirect: {
  //       destination: "/dashboard",
  //       permanent: false,
  //     },
  //   };
  // }
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
