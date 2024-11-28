// import * as React from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import dayjs from "dayjs";
// import { getAllUsers } from "../services/userService";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/auth.context";

// export default function Calendar({ onDateChange, onUserSelected, task }) {
//   const { admin } = useAuth();
//   const [date, setDate] = useState();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedValue, setSelectedValue] = useState("");

//   const handleChange = (event) => {
//     const selectedOption = event.target.value;

//     // Check if the selected option is not the placeholder
//     if (selectedOption !== "") {
//       setSelectedValue(selectedOption);
//       onUserSelected(selectedOption);
//     }
//   };
//   // const date = task.date.split("T")[0];

//   // setDate(date);

//   useEffect(() => {
//     if (admin) {
//       getAllUsers().then((response) => {
//         setUsers(response);
//         setLoading(false);
//       });
//       //setSelectedValue(task);
//     }
//   }, [admin]);
//   console.log(users);
//   useEffect(() => {
//     if (task) {
//       setDate(task.date);
//     }
//   }, [task]);
//   useEffect(() => {
//     if (users.length > 0 && task) {
//       const response = users.find((user) => user.id === task.user_id);
//       setSelectedValue(response?.id);
//     }
//   }, [users, task]);

//   const handleDateChange = (newDate) => {
//     if (newDate) {
//       let selectedDate = dayjs(newDate).format("YYYY-MM-DD"); // Formats the date without converting to UTC
//       console.log("Selected Date:", selectedDate);
//       onDateChange(selectedDate);
//     }
//   };

//   return (
//     <>
//       {admin && !loading && (
//         <select
//           className="form-select align-items-center w-50"
//           aria-label="Default select example"
//           value={selectedValue}
//           onChange={handleChange}
//         >
//           <option selected disabled>
//             Please select a user from the database
//           </option>

//           {users?.map((user) => (
//             <option key={user.id} value={user.id}>
//               {`Name: ${user.name}: \xa0  \xa0  Email: ${user.email}`}
//             </option>
//           ))}
//         </select>
//       )}
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DateCalendar
//           //value={date}
//           onChange={(newValue) => handleDateChange(newValue)}
//           value={dayjs(date)}
//         />
//       </LocalizationProvider>
//     </>
//   );
// }

import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { getAllUsers } from "../services/userService";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth.context";

export default function Calendar({ onDateChange, onUserSelected, task }) {
  const { admin } = useAuth();
  const { checked } = useAuth();
  const [date, setDate] = useState();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption !== "") {
      setSelectedValue(selectedOption);
      onUserSelected(selectedOption);
    }
  };

  useEffect(() => {
    if (admin) {
      getAllUsers().then((response) => {
        setUsers(response);
        setLoading(false);
      });
    }
  }, [admin]);

  useEffect(() => {
    if (task) {
      setDate(task.date);
    }
  }, [task]);

  useEffect(() => {
    if (users.length > 0 && task) {
      const response = users.find((user) => user.id === task.user_id);
      setSelectedValue(response?.id);
    }
  }, [users, task]);

  const handleDateChange = (newDate) => {
    if (newDate) {
      let selectedDate = dayjs(newDate).format("YYYY-MM-DD");
      onDateChange(selectedDate);
    }
  };

  return (
    <div
      className={`container mt-4 ${
        !checked ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      {admin && !loading ? (
        <div className="row">
          <div className="col-md-6 mb-4">
            <div
              className={`p-3 border rounded ${
                checked ? "bg-light" : "bg-dark"
              }`}
            >
              <h6 className="text-center">All users registered</h6>
              <select
                className="form-select w-100"
                aria-label="Select a user"
                value={selectedValue}
                onChange={handleChange}
              >
                <option default>Please select a user from the database</option>
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {`Name: ${user.name} - Email: ${user.email}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className={`p-3 border rounded ${
                checked ? "bg-light" : "bg-dark"
              }`}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  onChange={(newValue) => handleDateChange(newValue)}
                  value={dayjs(date)}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div
            className={`p-3 border rounded ${
              checked ? "bg-secondary" : "bg-light"
            }`}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                onChange={(newValue) => handleDateChange(newValue)}
                value={dayjs(date)}
              />
            </LocalizationProvider>
          </div>
        </div>
      )}
    </div>
  );
}
