import React from "react";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";

function SubmitTask({
  handleSelectChange,
  selectValue,
  saveSubmissionHandler,
  taskId,
  onChangleHandler,
}) {
  return (
    <div className="submission">
      <div className="submit">
        <div className="t2">Submission</div>
      </div>
      <label>Preferred Method</label> <br />
      <select onChange={handleSelectChange}>
        <option value="Upload a file">Document upload</option>
        <option value="Add a link">Add a link</option>
      </select>
      <div className="display_inputs">
        {selectValue === "Upload a file" ? (
          <div className="file-upload">
            <input type="file" onChange={onChangleHandler} />
            <div className="items">
              <BackupOutlinedIcon style={{ fontSize: "45px", color: "lightgray" }} />
              <p>Upload a file</p>
            </div>
          </div>
        ) : (
          ""
        )}

        {selectValue === "Add a link" ? (
          <div className="input_link">
            <label htmlFor="link">Enter submission link</label> <br />
            <input type="text" onChange={onChangleHandler} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="btnn">
        <button className="sub_btn" onClick={() => saveSubmissionHandler(taskId)}>
          Save Submission
        </button>
      </div>
    </div>
  );
}

export default SubmitTask;
