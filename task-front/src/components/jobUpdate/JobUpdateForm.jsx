import { useState, useEffect } from "react";
import { updateJob } from "../../services/JobServices";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
/*
 you'll get a userId from the page slug { :id }
  get the task state from passing through page navigate.
*/

const JobUpdateForm = ({ task, date, userId }) => {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [topic, setTopic] = useState(); //
  useEffect(() => {
    setMessage(task.content);
    setTopic(task.topic);
    console.log("task: ", task, date);
  }, [task]);

  // const [success, setSuccess] = useState(false);
  // const [failed, setFailed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit your form logic here
    console.log(date);
    console.log("Submitted Message:", message);

    try {
      const response = await updateJob(task._id, {
        date: date,
        content: message,
        comment: admin ? "" : message,
        topic: topic,
        status: admin ? 0 : 1,
        user_id: userId,
      });
      toast.success("The job was updated successfully");
      console.log(admin);
      navigate("/");
      // afterSubmit();
    } catch (err) {
      toast.error("Error in updating job ⚠️ ,please try again later");
      // if (err.response?.status === 400) {
      //   setServerError(err.response.data);
      // }
    }
    // setMessage("");
    // setTopic("");
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="topic" className="form-label">
            Choose a topic:
          </label>
          <select
            name="topic"
            id="topic"
            className="form-select"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="technology">Technology</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Your Message (up to 500 characters):
          </label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            rows="4"
            maxLength="500"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          up date job
        </button>
      </form>
    </div>
  );
};
export default JobUpdateForm;
