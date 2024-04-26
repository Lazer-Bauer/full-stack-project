import { useEffect, useState } from "react";
import { getPendingJobs } from "../../services/JobServices";
import TaskCard from "./TaskCard";
import CompletedJob from "./CompletedJob";

const PendingJobs = () => {
  const [pendingJobs, setPendingJobs] = useState("");
  async function fechPeningJobs() {
    const response = await getPendingJobs();
    setPendingJobs(response.data);
  }

  useEffect(() => {
    fechPeningJobs();
  }, []);
  console.log(pendingJobs);
  return (
    <>
      {pendingJobs &&
        pendingJobs.map((job) => (
          <CompletedJob
            date={job.date}
            topic={job.topic}
            task={job.content}
            userId={job.user_id}
            jobId={job._id}
            jobComment={job.comment}
            jobStatus={job.status}
            key={job._id}
            refresh={fechPeningJobs}
          />
        ))}
    </>
  );
};
export default PendingJobs;
