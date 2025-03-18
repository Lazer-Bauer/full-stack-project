import { useAuth } from "../context/auth.context";
import JobCreation from "./jobCreation/index";
import { getJobByUserId } from "../services/JobServices";
import TaskCard from "./jobCreation/TaskCard";
import { useEffect, useState } from "react";

const Home = () => {
  const { user, admin, checked, search } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    let explanationTimeout;

    async function fetchJobs() {
      try {
        const response = await getJobByUserId(user._id);
        console.log(response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
        clearTimeout(explanationTimeout); // Clear the timeout if data loads successfully
      }
    }

    // Trigger data fetching
    fetchJobs();

    // Set timeout for explanation
    explanationTimeout = setTimeout(() => {
      setShowExplanation(true);
    }, 5000); // 5 seconds timeout

    // Cleanup timeout on unmount
    return () => clearTimeout(explanationTimeout);
  }, [admin, user._id]);

  if (loading) {
    return (
      <div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 1050,
          }}
        >
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
        </div>
        {showExplanation && (
          <div
            className="explanation text-center mt-3"
            style={{
              position: "fixed",
              bottom: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1060,
            }}
          >
            <p>Fetching data is taking longer than expected.</p>
            <p>
              Please check your internet connection or try refreshing the page.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage:
          !admin && !user
            ? `url('https://www.shutterstock.com/image-photo/checklist…task-documentation-management-600w-2470813805.jpg')`
            : "none", // No background image if not admin
        backgroundSize: "cover",
        backgroundPosition: "center",

        zIndex: "1",
      }}
    >
      <h1 className={`text-center ${!checked && "text-white"}`}>
        Welcome back {user && !admin && `${user.name.first} ${user.name.last}`}
        {admin && "Admin"}
      </h1>
      {admin && (
        <h4 className={`text-center ${!checked && "text-white"}`}>
          Please choose a user and a date to start creating a job.
        </h4>
      )}
      <JobCreation />
      {jobs && jobs.length > 0 ? (
        <div className="cards-container d-flex flex justify-content-center align-items-center flex-wrap">
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
            : jobs.map((job) => (
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
