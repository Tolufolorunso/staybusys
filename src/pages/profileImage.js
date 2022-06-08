import Head from "next/head";
// import React, { useRef, useState } from "react";
import Layout from "src/components/Layout";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import CloseIcon from "@mui/icons-material/Close";
import getCroppedImg from "./cropimage";

import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";

import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid rgba(105, 110, 255, 0.2)",
  boxShadow: "0px 7px 20px rgba(145, 156, 212, 0.15)",
  borderRadius: "7px",
  padding: "3rem",
};

export default function ProfileImage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [highlight, setHighlight] = React.useState(false);
  const [mouseEnter, setMouseEnter] = React.useState(false);
  const [preview, setPreview] = React.useState("");
  const [drop, setDrop] = React.useState(false);
  const [imageFile, setFile] = React.useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  function rotateimageRight() {
    setRotation(rotation + 5);
  }
  function rotateimageLeft() {
    setRotation(rotation - 5);
  }

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageFile, croppedAreaPixels, rotation);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      setPreview(croppedImage);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  function stopUload() {
    console.log("first");
    setOpen(false);
    setPreview("");
    setFile("");

    setDrop(false);
  }

  

  const handleEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("enter!");
    setMouseEnter(true)

    preview === "" && setHighlight(true);
  };

  const handleOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("over!");

    preview === "" && setHighlight(true);
  };

  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("leave!");
    setHighlight(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("drop!");
    setHighlight(false);
    setDrop(true);

    const [file] = e.target.files || e.dataTransfer.files;

    uploadFile(file);
    setFile(file);
  };

  function uploadFile(file) {
    console.log(file);
    try {
      const reader = new FileReader();

      reader.readAsBinaryString(file);
      console.log(file);
      // setFile(file)
      reader.onload = (e) => {
        // this is the base64 data
        const fileRes = btoa(reader.result);
        setFile(`data:image/jpg;base64,${fileRes}`);
        console.log(`data:image/jpg;base64,${fileRes}`);
        setPreview(`data:image/jpg;base64,${fileRes}`);
      };
    } catch (err) {
      console.log(err);
    }

    reader.onerror = () => {
      console.log("There is a problem while uploading...");
    };
  }
  return (
    <div>
      <Head>
        <title>Choose Tasks | Material Kit</title>
      </Head>
      <Layout>
        <div className="my_container ">
          <div className="choose_tasks">
            <div className="choose">
              <h4>Attach a photo to your profile</h4>
              <span className="tab">2/3</span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="image_upload"></div>
              </div>
              <div className="uploadimg_hold">
                <div
                  onDragEnter={(e) => handleEnter(e)}
                  onDragLeave={(e) => handleLeave(e)}
                  onDragOver={(e) => handleOver(e)}
                  onDrop={(e) => handleUpload(e)}
                  className={`upload${highlight ? " is-highlight" : drop ? " is-drop" : ""}`}
                  style={{ backgroundImage: `url(${preview})` }}
                >
                  <form onSubmit={(e) => e.preventDefault()} className="upload_form">
                    <BackupOutlinedIcon style={{ fontSize: "75px", color: "lightgray" }} />

                    <p>Drag and Drop image here</p>
                    <div className="upload-button">
                      <input
                        type="file"
                        className={`upload-file ${mouseEnter ? 'displayNone' : ''}`}
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

              <button
                onClick={handleOpen}
                style={{ justifyContent: "center" }}
                className="upload_btn actn_btn"
              >
                Proceed
              </button>

              <Modal
                open={open}
                onClose={handleClose}
                image={preview}
                getCroppedFile={(preview) => {
                  setPreview(preview);
                  handleClose();
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} className="modalss">
                  {/* { <ImageCropper />  */}
                  {/* <ImageCropper imageFile={imageFile} /> */}
                  <div>
                    <div className="crop">
                      <p>Crop image and upload</p>
                      <span>
                        <CloseIcon
                          onClick={stopUload}
                          style={{ fontSize: "40px", cursor: "pointer" }}
                        />
                      </span>
                    </div>
                    <div className="cropContainer">
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
                        {/* <Typography variant="overline" className="sliderLabel">
                          Zoom
                        </Typography> */}
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
                        {/* <Typography variant="overline" className="sliderLabel">
                          Rotation
                        </Typography>
                        {rotation}
                        <Slider
                          value={rotation}
                          min={0}
                          max={360}
                          step={1}
                          aria-labelledby="Rotation"
                          className="slider"
                          onChange={(e, rotation) => setRotation(rotation)}
                        /> */}

                        <div className="rotateBtns">
                          <button onClick={rotateimageRight} className="cropButton">
                            <span>
                              <RotateRightIcon style={{ fontSize: "40px" }} />
                            </span>
                            <span className="roate_text">Rotate Right</span>
                          </button>
                          <button onClick={rotateimageLeft} className="cropButton">
                            <span>
                              <RotateLeftIcon style={{ fontSize: "40px" }} />
                            </span>
                            <span className="roate_text">Rotate Left</span>
                          </button>
                        </div>
                      </div>
                      <buttom style={{ cursor: "pointer" }} onClick={showCroppedImage} className="cropButtonEnter">
                        Upload Profile Photo
                      </buttom>
                    </div>
                    {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
