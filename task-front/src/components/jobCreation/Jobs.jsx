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
    const response =
      status === 0
        ? await getOpenJobs()
        : status === 1
        ? await getPendingJobs()
        : status === 2
        ? await getCompletedJobs()
        : await getAllJobs();
    {
    }
    setJobs(response.data ?? []);
  }

  useEffect(() => {
    loadJobs();
  }, [status]);
  console.log(jobs);
  // const FilterJobs = (jobs, search) =>
  //   jobs?.every((job) =>
  //     ["content", "comment", "topic"].some((attribute) =>
  //       job.Attributes[attribute].includes(search)
  //     )
  //   );
  // console.log(FilterJobs());
  return (
    <>
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
        : // .filter((job) => job.content.includes(search))
          // .map((job) => (
          //   <CompletedJob
          //     date={job.date}
          //     topic={job.topic}
          //     task={job.content}
          //     userId={job.user_id}
          //     jobId={job._id}
          //     jobComment={job.comment}
          //     jobStatus={job.status}
          //     key={job._id}
          //     refresh={loadJobs}
          //   />
          // ))
          jobs &&
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