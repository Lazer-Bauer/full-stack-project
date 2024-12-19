import { useAuth } from "../context/auth.context";
import JobCreation from "./jobCreation/index";
import { getJob, getJobByUserId } from "../services/JobServices";
import TaskCard from "./jobCreation/TaskCard";
import { useEffect, useState } from "react";

const Home = () => {
  const { user, admin, checked, search } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      getJobByUserId(user._id)
        .then((response) => {
          console.log(response.data);
          setJobs(response.data);
        })
        .catch((error) => console.log(error));
    }
    fetchJobs();
  }, [admin]);

  return (
    <div>
      <h1 className={`text-center ${!checked && "text-white"}`}>
        welcome back {user && !admin && user.name.first}&nbsp;
        {user && !admin && user.name.last}
        {admin && "Admin"}
      </h1>
      {admin && (
        <h4 className={`text-center ${!checked && "text-white"}`}>
          Please choose a user and a date to start creating a job.
        </h4>
      )}
      <JobCreation />
      {jobs && jobs.length > 0 ? (
        <div className="cards-container d-flex flex justify-content-center align-items-center flex-wrap  ">
          {search
            ? jobs

                .filter(
                  (job) =>
                    job.content?.includes(search) ||
                    job.topic?.includes(search) ||
                    job.comment?.includes(search)
                )
                .map((job) => (
                  <TaskCard
                    date={job.date}
                    topic={job.topic}
                    task={job.content}
                    userId={job.user_id}
                    jobId={job._id}
                    jobComment={job.comment}
                    jobStatus={job.status}
                    key={job._id}
                  />
                ))
            : jobs &&
              jobs.map((job) => (
                <TaskCard
                  date={job.date}
                  topic={job.topic}
                  task={job.content}
                  userId={job.user_id}
                  jobId={job._id}
                  jobComment={job.comment}
                  jobStatus={job.status}
                  key={job._id}
                />
              ))}
        </div>
      ) : (
        !admin && <h2 className="text-center">You have no jobs</h2>
      )}
    </div>
  );
};
export default Home;
