import { deleteJob, patchJob, updateJob } from "../../services/JobServices";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

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
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setStatus(jobStatus ? "pending..." : "open");
    setComment(jobComment);
  }, []);
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
    console.log(userId, jobId);
    // Here you would typically send the comment to a server
    // Reset comment input after submission
    await patchJob(jobId, { comment, status: 1 });
    setStatus("pending....");
  };

  return (
    <div className="container my-5">
      <div className="card">
        <div className="d-flex justify-content-between align-items-center w-100 bg-primary">
          <div className="card-header text-center  text-white">
            <h5>Task for {date}</h5>
          </div>
          <div className="m-4  text-white">{status}</div>
        </div>

        <div className="card-body">
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
              maxLength="5000"
              minLength="5"
              rows="3"
              placeholder="Type your comment here..."
            ></textarea>
          </div>
          <div className="d-flex justify-content-between w-100">
            <button
              disabled={jobStatus}
              onClick={submitComment}
              className="btn btn-primary"
            >
              Submit Comment
            </button>
            <button onClick={handleCompleteJob} className="btn btn-primary">
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
