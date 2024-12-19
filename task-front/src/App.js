import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Home from "./components/Home";
import SignUp from "./components/Sign-up";
import SignIn from "./components/Sign-in";
import protectedRoute from "./common/protectedRoutes";
import { Route, Routes } from "react-router-dom";
import SignOut from "./components/Sign-out";
import ProtectedRoute from "./common/protectedRoutes";
import { ToastContainer } from "react-toastify";
import Jobs from "./components/jobCreation/Jobs";
import IsAdmin from "./common/IsAdmin";
import JobUpdate from "./components/jobUpdate/index";
import Footer from "./components/Footer";
import About from "./components/About";
import { checked, useAuth } from "./context/auth.context";
function App() {
  const { checked } = useAuth();
  return (
    <div className={`App ${!checked ? "bg-dark" : "bg - light"}`}>
      <Header />
      <div className="content">
        <Routes>
          {/* <Route path="/about" element={<About />} /> */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending"
            element={
              <IsAdmin>
                <Jobs status={1} />
              </IsAdmin>
            }
          />
          <Route
            path="/alljobs"
            element={
              <IsAdmin>
                <Jobs />
              </IsAdmin>
            }
          />
          <Route
            path="/open"
            element={
              <IsAdmin>
                <Jobs status={0} />
              </IsAdmin>
            }
          />
          <Route
            path="/completed"
            element={
              <IsAdmin>
                <Jobs status={2} />
              </IsAdmin>
            }
          />
          <Route
            path="/update-job/:id"
            element={
              <IsAdmin>
                <JobUpdate />
              </IsAdmin>
            }
          />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/about" element={<About />} />

          <Route path="/sign-up-biz" element={<SignUp isBusiness />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
