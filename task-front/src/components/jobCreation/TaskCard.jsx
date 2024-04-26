import { toast } from "react-toastify";
import { patchJob } from "../../services/JobServices";

import React, { useEffect, useState } from "react";

const TaskCard = ({
  date,
  topic,
  task,
  userId,
  jobId,
  jobComment,
  jobStatus,
}) => {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(jobStatus ? "pending..." : "open");
    setComment(jobComment);
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = async () => {
    console.log("Comment submitted:", comment);
    console.log(userId, jobId);
    try {
      await patchJob(jobId, { comment, status: 1 });
      setStatus("pending....");
      toast.success("your assignment was submitted successfully");
    } catch (err) {
      toast.error("Error in creating job ⚠️ ,please try again later");
    }
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
          <button
            disabled={jobStatus}
            onClick={submitComment}
            className="btn btn-primary"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
