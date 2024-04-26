import { useState, useEffect } from "react";
import { createJob } from "../../services/JobServices";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";

const JobCreationForm = ({ selectedDate, selectedUser, afterSubmit }) => {
  const [topic, setTopic] = useState("technology"); // default topic
  const [message, setMessage] = useState("");
  // const [success, setSuccess] = useState(false);
  // const [failed, setFailed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit your form logic here
    console.log("Submitted Topic:", topic);
    console.log("Submitted Message:", message);
    console.log(selectedDate, selectedUser);

    try {
      const response = await createJob({
        user_id: selectedUser,
        topic: topic,
        content: message,
        date: selectedDate,
      });
      toast.success("The job was created successfully");
      afterSubmit();
    } catch (err) {
      toast.error("Error in creating job ⚠️ ,please try again later");
      // if (err.response?.status === 400) {
      //   setServerError(err.response.data);
      // }
    }
    setMessage("");
    setTopic("");
  };

  return (
    <div className="container mt-5">
      {/* {success && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Job was created successfully
        </Alert>
      )}
      {failed && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          failed to create job ! try again later
        </Alert>
      )} */}
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
          Submit
        </button>
      </form>
    </div>
  );
};
export default JobCreationForm;
