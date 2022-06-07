import Head from "next/head";
import React, { useRef, useState } from "react";
import Layout from "src/components/Layout";
// import  {useDropzone}  from "react-dropzone";
import {useDropzone} from 'react-dropzone'

export default function Home() {
  const [yourImage, setImage] = useState([]);
  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(false);

  const handleImageChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };
  const{getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImage(
        acceptedFiles.map((upFile) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
    },
  });

  const images = yourImage.map((file)=>{
    <div key={file.name}>
      <img src={file.preview} style={{width:'200px'}} alt="" />
    </div>
  })
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
                <div className="image_upload">
                {error && <p className="errorMsg">File not supported</p>}
                 {yourImage.map((upFile) => {
                   return(
                     <div>
                       <img src={upFile.preview} style={{width:"100%",height:"400px"}} />
                     </div>
                   )
                 })}
                   {yourImage && (
                  <div {...getRootProps()}>
                    <input {...getInputProps()}  placeholder="hello" />
                    {/* {isDragActive ? <p></p> : <p>{yourImage? "draggss" : "drops" }</p>} */}
                    <p>Drop Files</p>
                    <div>{images}</div>
                  </div>
                     )}
                </div>

              </div>
              <div
          className="imgPreview"
          style={{
            background: imgPreview
              ? `url("${imgPreview}") no-repeat center/cover`
              : "#131313"
          }}
        >
          {!imgPreview && (
            <div {...getRootProps()}>

              <input {...getInputProps()}   type="file" id="fileUpload" onChange={handleImageChange} />
              {isDragActive }
            </div>
          )}
        </div>
        {imgPreview && (
          <button onClick={() => setImgPreview(null)}>Remove image</button>
        )}
              <button style={{ justifyContent: "center" }} className="actn_btn">
                  Proceed
                </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
