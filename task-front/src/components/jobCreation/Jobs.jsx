import { useEffect, useState } from "react";
import {
  getPendingJobs,
  getAllJobs,
  getCompletedJobs,
  getOpenJobs,
} from "../../services/JobServices";
import TaskCard from "./TaskCard";
import CompletedJob from "./CompletedJob";
import { useAuth } from "../../context/auth.context";
const Jobs = ({ status }) => {
  const { search, jobs, setJobs } = useAuth();

  async function loadJobs() {
    console.log("enter");
    const response =
      status === 0
        ? await getOpenJobs()
        : status === 1
        ? await getPendingJobs()
        : status === 2
        ? await getCompletedJobs()
        : await getAllJobs();
    console.log(search);
    setJobs(response.data ?? []);
  }

  useEffect(() => {
    loadJobs();
  }, [status]);
  console.log(jobs, "lazer");

  return (
    <>
      {jobs && jobs.length === 0 && (
        <span className="d-flex justify-content-center">
          <img src="https://img.freepik.com/premium-vector/no-task-available-illustration_585024-46.jpg"></img>
        </span>
      )}
      {search
        ? jobs

            .filter(
              (job) =>
                job.content?.includes(search) ||
                job.topic?.includes(search) ||
                job.comment?.includes(search)
            )
            .map((job) => (
              <CompletedJob
                date={job.date}
                topic={job.topic}
                task={job.content}
                userId={job.user_id}
                jobId={job._id}
                jobComment={job.comment}
                jobStatus={job.status}
                key={job._id}
                refresh={loadJobs}
              />
            ))
        : jobs &&
          jobs.map((job) => (
            <CompletedJob
              date={job.date}
              topic={job.topic}
              task={job.content}
              userId={job.user_id}
              jobId={job._id}
              jobComment={job.comment}
              jobStatus={job.status}
              key={job._id}
              refresh={loadJobs}
            />
          ))}
    </>
  );
};
export default Jobs;
