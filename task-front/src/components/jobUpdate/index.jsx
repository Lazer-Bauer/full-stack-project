import JobUpdateForm from "./JobUpdateForm";
import Calendar from "../../reusables/Calendar";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getJob } from "../../services/JobServices";

export default function JobUpdate() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [job, setJob] = useState({});

  const { id } = useParams();
  const [userId, setUserId] = useState();
  useEffect(() => {
    console.log(id);
    async function fetchJob() {
      getJob(id)
        .then((response) => {
          console.log(response.data[0]);
          setJob(response.data[0]);
          setSelectedDate(response.data[0].date);
        })
        .catch((error) => console.log(error));
    }
    fetchJob();
  }, [id]);

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };
  const handleUserChange = (id) => {
    setUserId(id);
  };
  return (
    <>
      <Calendar
        task={job}
        onDateChange={handleDateChange}
        onUserSelected={handleUserChange}
      />
      <JobUpdateForm task={job} date={selectedDate} userId={userId} />
    </>
  );
}
