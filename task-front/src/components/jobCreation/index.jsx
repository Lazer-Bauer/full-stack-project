import Calendar from "../../reusables/Calendar";
import { useState } from "react";
import JobCreationForm from "./JobCreationForm";
function JobCreation() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserChange = (user) => {
    setSelectedUser(user);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const reset = () => {
    setSelectedDate(false);
    setSelectedUser(false);
  };

  return (
    <div>
      <Calendar
        onUserSelected={handleUserChange}
        onDateChange={handleDateChange}
      />
      {selectedDate && selectedUser && (
        <JobCreationForm
          selectedDate={selectedDate}
          selectedUser={selectedUser}
          afterSubmit={reset}
        />
      )}
    </div>
  );
}

export default JobCreation;
