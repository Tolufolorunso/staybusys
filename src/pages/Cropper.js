import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Slider from "@material-ui/core/Slider";
import "cropperjs/dist/cropper.css";

export default function CropperDemo({ src, getCroppedFile }) {
  const cropperRef = useRef(null);
  const [loading, setLoading] = useState(true);


  const handleClick = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const img = cropper.getCroppedCanvas().toDataURL();
    getCroppedFile(img);
  };
  const rotateleft = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.rotate(45);
  };
  const rotateright = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.rotate(-45);
  };
  const zoom = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const containerData = cropper.getContainerData();

    cropper.zoomTo(.5, {
      x: containerData.width / 2,
      y: containerData.height / 2,
    });
  }

  return (
    <>
      {loading && (
        <Skeleton variant="rectangular" width={"100%"} height={400} />
      )}
      <Box display={"flex"} justifyContent={"flex-end"} mb={1}>
        <ButtonGroup disableElevation variant="contained">
          <Button onClick={rotateleft}>Rotate Left</Button>
          <Button onClick={rotateright}>Rotate right</Button>


        </ButtonGroup>
      </Box>

      <Cropper
        src={src}
        style={{ height: 400, width: "100%" }}
        // Cropper.js options
        initialAspectRatio={16 / 9}
        guides={false}

        ready={() => {

          setLoading(false);
        }}
        ref={cropperRef}
      />

      <Button
        sx={{
          float: "right",
          mt: 1
        }}
        onClick={handleClick}
        autoFocus
        color="success"
        variant="contained"
      >
        Crop
      </Button>
    </>
  );
}
