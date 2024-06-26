import { useAuth } from "../context/auth.context";
import JobCreation from "./jobCreation/index";
import { getJob, getJobByUserId } from "../services/JobServices";
import TaskCard from "./jobCreation/TaskCard";
import { useEffect, useState } from "react";

const Home = () => {
  const { user, admin } = useAuth();
  const [jobs, setJobs] = useState([]);
  const { checked, search } = useAuth();

  useEffect(() => {
    async function fechJobs() {
      getJobByUserId(user._id)
        .then((response) => {
          console.log(response.data);
          setJobs(response.data);
        })
        .catch((error) => console.log(error));
    }
    fechJobs();
  }, [admin]);

  return (
    <div>
      <h1 className="text-center">
        welcome back {user && !admin && user.name.first}&nbsp;
        {user && !admin && user.name.last}
        {admin && "Admin"}
      </h1>
      <JobCreation />
      {jobs ? (
        <div className="cards-container d-flex flex justify-content-center align-items-center flex-wrap  ">
          {jobs.map((job) => {
            const date = job.date.split("T")[0];
            console.log(job.date.split("T"));
            return (
              <TaskCard
                date={date}
                topic={job.topic}
                task={job.content}
                userId={job.user_id}
                jobId={job._id}
                jobComment={job.comment}
                jobStatus={job.status}
              />
            );
          })}
        </div>
      ) : (
        "<h2>You have no jobs</h2>"
      )}
    </div>
  );
};
export default Home;
