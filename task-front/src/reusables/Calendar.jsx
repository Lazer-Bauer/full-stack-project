// import * as React from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import dayjs from "dayjs";
// import { getAllUsers } from "../services/userService";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/auth.context";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";

// const darkTheme = createTheme({
//   palette: {
//     mode: "light",
//   },
// });
// export default function Calendar({ onDateChange, onUserSelected, task }) {
//   const { admin } = useAuth();
//   const { checked } = useAuth();
//   const [date, setDate] = useState();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedValue, setSelectedValue] = useState("");

//   const handleChange = (event) => {
//     const selectedOption = event.target.value;
//     if (selectedOption !== "") {
//       setSelectedValue(selectedOption);
//       onUserSelected(selectedOption);
//     }
//   };

//   useEffect(() => {
//     if (admin) {
//       getAllUsers().then((response) => {
//         setUsers(response);
//         setLoading(false);
//       });
//     }
//   }, [admin]);

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
//       let selectedDate = dayjs(newDate).format("YYYY-MM-DD");
//       onDateChange(selectedDate);
//     }
//   };

//   return (
//     <div
//       className={`container mt-4 ${
//         !checked ? "bg-dark text-white" : "bg-light text-dark"
//       }`}
//     >
//       {admin && !loading ? (
//         <div className="row">
//           <div className="col-md-6 mb-4">
//             <div
//               className={`p-3 border rounded ${
//                 checked ? "bg-light" : "bg-dark"
//               }`}
//             >
//               <h6 className="text-center">All users registered</h6>
//               <select
//                 className="form-select w-100"
//                 aria-label="Select a user"
//                 value={selectedValue}
//                 onChange={handleChange}
//               >
//                 <option default>Please select a user from the database</option>
//                 {users?.map((user) => (
//                   <option key={user.id} value={user.id}>
//                     {`Name: ${user.name} - Email: ${user.email}`}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div
//               className={`p-3 border rounded ${
//                 !checked ? "bg-dark" : "bg-light"
//               }`}
//             >
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateCalendar
//                   onChange={(newValue) => handleDateChange(newValue)}
//                   value={dayjs(date)}
//                 />
//               </LocalizationProvider>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="d-flex justify-content-center">
//           <div
//             className={`p-3 border rounded ${
//               !checked ? "bg-dark text-white" : "bg-light"
//             }`}
//           >
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DateCalendar
//                 onChange={(newValue) => handleDateChange(newValue)}
//                 value={dayjs(date)}
//                 sx={{
//                   bgcolor: "background.white", // Ensures it's consistent with light mode bg
//                   color: "text.white", // Ensures text color remains readable
//                   borderRadius: "8px", // Optional: rounded corners
//                 }}
//               />
//             </LocalizationProvider>
//           </div>
//         </div>
//       )}
//     </div>
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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});
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
                !checked ? "bg-dark" : "bg-light"
              }`}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  onChange={(newValue) => handleDateChange(newValue)}
                  value={dayjs(date)}
                  sx={{
                    bgcolor: "background.paper",
                    color: "text.primary",
                    borderRadius: "8px",
                    "& .MuiPickersDay-root": {
                      color: "black",
                    },
                    "& .MuiPickersDay-root.Mui-selected": {
                      backgroundColor: !checked ? "#1976d2" : "#1976d2",
                      color: "white",
                    },
                    "& .MuiPickersDay-root:hover": {
                      backgroundColor: !checked ? "#115293" : "#115293",
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div
            className={`p-3 border rounded ${
              !checked ? "bg-dark text-white" : "bg-light"
            }`}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                onChange={(newValue) => handleDateChange(newValue)}
                value={dayjs(date)}
                sx={{
                  bgcolor: "background.paper",
                  color: "text.primary",
                  borderRadius: "8px",
                  "& .MuiPickersDay-root": {
                    color: "black",
                  },
                  "& .MuiPickersDay-root.Mui-selected": {
                    backgroundColor: !checked ? "#1976d2" : "#1976d2",
                    color: "white",
                  },
                  "& .MuiPickersDay-root:hover": {
                    backgroundColor: !checked ? "#115293" : "#115293",
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
      )}
    </div>
  );
}
