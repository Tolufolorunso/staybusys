import Head from "next/head";
import React, { useRef, useState } from "react";
import Layout from "src/components/Layout";
// import  {useDropzone}  from "react-dropzone";
import { useDropzone } from "react-dropzone";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
// import ImageCropper from "../components/imageupload/ImageCropper";
// import ImageCropper from './imageupload/imageCropper'
import ImageCropper from './ImageCropper'


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
  p: 4,
};

export default function profileImage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [highlight, setHighlight] = React.useState(false);
  const [preview, setPreview] = React.useState("");
  const [drop, setDrop] = React.useState(false);
  const [imageFile, setFile] = React.useState([]);

  const handleEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("enter!");

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
    setFile(file)
  };

  function uploadFile(file) {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    console.log(file)
    // setFile(file)

    reader.onload = (e) => {
      // this is the base64 data
      const fileRes = btoa(reader.result);
      const fileResult = e.target.result;
      console.log(fileResult)
      setFile(`data:image/jpg;base64,${fileRes}`)
      console.log(`data:image/jpg;base64,${fileRes}`);
      setPreview(`data:image/jpg;base64,${fileRes}`);
    };

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
                  <form className="upload_form">
                    <BackupOutlinedIcon style={{ fontSize: "75px", color: "lightgray" }} />
                
                    <p>Drag and Drop image here</p>
                    <div className="upload-button">
                      <input
                        type="file"
                        className="upload-file"
                        accept="image/*"
                        onChange={(e) => handleUpload(e)}
                      />
                      {/* <button className="button">Upload Here</button> */}
                    </div>
                  </form>
                </div>
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
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} className="modalss">
                  {/* <ImageCropper /> */}
                  <ImageCropper imageFile={imageFile}/>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
