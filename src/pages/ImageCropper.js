import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
// import ImgDialog from "./Imgdialog"
import ReactDOM from "react-dom";
import getCroppedImg from "../components/cropimage";


const dogImg =
  "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";

export default function Demo({ imageFile }) {
  console.log(imageFile);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  function rotateimageRight (){
    setRotation(rotation + 5)
  }
  function rotateimageLeft (){
    setRotation(rotation - 5)
  }

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageFile, croppedAreaPixels, rotation);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div>
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
          <Typography variant="overline" className="sliderLabel">
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
          />
          <Button onClick={rotateimageRight} variant="contained" color="primary" className="cropButton">
            rotate right
          </Button>
          <Button onClick={rotateimageLeft} variant="contained" color="primary" className="cropButton">
            rotate left
          </Button>
        </div>
        <Button
          onClick={showCroppedImage}
          variant="contained"
          color="primary"
          className="cropButton"
        >
          Show Result
        </Button>
      </div>
      {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
    </div>
  );
}



// export default Demo
