import { deleteJob, patchJob, updateJob } from "../../services/JobServices";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.context";
const CompletedJob = ({
  date,
  topic,
  task,
  userId,
  jobId,
  jobComment,
  jobStatus,
  refresh,
}) => {
  const { checked } = useAuth();
  const [comment, setComment] = useState(jobComment);
  const [status, setStatus] = useState(
    jobStatus === 0 ? "open" : jobStatus === 1 ? "pending..." : "completed"
  );
  const navigate = useNavigate();
  // useEffect(() => {
  //   setStatus(jobStatus ? "pending..." : "open");
  //   setComment(jobComment);
  // }, []);
  const handleCompleteJob = async () => {
    await patchJob(jobId, { comment, status: 2 });
    setStatus("complete");
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleDeleteJob = async () => {
    await deleteJob(jobId);
    refresh();
  };
  const handleUpdateJob = async () => {
    // 1 [x]. pass a job state to this navigate...
    // 2 []. set a context state for jobToUpdate...
    // 3. passing the jobId. so when in the updateJob component, fetch the job from api again using that id.
    navigate(`/update-job/${jobId}`);
  };
  const submitComment = async () => {
    console.log("Comment submitted:", comment);
    console.log(jobStatus, "from completesJobs");
    // Here you would typically send the comment to a server
    // Reset comment input after submission
    await patchJob(jobId, { comment, status: 1 });
    setStatus("pending....");
  };

  return (
    <div className="container my-5">
      <div className="card ">
        <div className="d-flex justify-content-between align-items-center w-100 bg-primary">
          <div
            className={`card-header text-center  text-white ${
              !checked && "bg-dark"
            }`}
          >
            <h5>Task for {date?.split("T")[0]}</h5>
          </div>
          <div className="m-4  text-white">{status}</div>
        </div>

        <div
          className={`card-body ${!checked ? "bg-dark" : "bg-light text-whit"}`}
        >
          <h5 className="card-title">{topic}</h5>
          <p className="card-text">{task}</p>
          <div className="mb-3">
            <label htmlFor="commentTextarea" className="form-label">
              Your Comment
            </label>
            <textarea
              className="form-control"
              id="commentTextarea"
              value={comment}
              onChange={handleCommentChange}
              disabled={status !== "open"}
              maxLength="5000"
              minLength="5"
              rows="3"
              placeholder="Type your comment here..."
            ></textarea>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between w-100 p-3">
            <button
              onClick={submitComment}
              disabled={status !== "open"}
              className="btn btn-primary"
            >
              Submit Comment
            </button>
            <button
              onClick={handleCompleteJob}
              disabled={status === "completed"}
              className="btn btn-primary"
            >
              confirm completion
            </button>

            <button onClick={handleDeleteJob} className="btn btn-danger">
              Delete job
            </button>

            <button onClick={handleUpdateJob} className="btn btn-danger">
              Update job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompletedJob;
