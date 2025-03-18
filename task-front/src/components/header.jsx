import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useState, useEffect } from "react";

const Header = () => {
  const {
    user,
    checked = false,
    setChecked,
    search,
    setSearch,
    jobs,
    admin,
  } = useAuth();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    if (location.pathname === "/" && jobs.length > 0 && !admin) {
      setShowSearch(true);
    } else if (
      location.pathname === "/" ||
      location.pathname === "/about" ||
      !user
    ) {
      setShowSearch(false);
    } else {
      setShowSearch(jobs.length > 0);
    }
    console.log("im use effect header", showSearch, jobs.length);
  }, [location, jobs, showSearch]);
  const toggle = () => {
    setChecked(!checked);
    console.log(checked);
  };

  const handleInputChange = (event) => {
    setSearch(event.target?.value);
    console.log(event.target.value, event);
  };

  return (
    <>
      <header
        className={`p-3 mb-3 border-bottom w-100 ${
          !checked ? "bg-dark text-light" : "bg-info"
        } navbar navbar-expand-sm position-fixed z-3`}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className={`navbar-toggler-icon  ${!checked && "bg-light"}`}
          ></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <div className="container">
            <div
              className={`${
                !checked && "text-primary"
              }d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start`}
            >
              <Link
                to="/"
                className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
              >
                <svg
                  className="bi me-2"
                  width="40"
                  height="32"
                  role="img"
                  aria-label="Bootstrap"
                ></svg>
              </Link>

              <ul
                className={`navbar-nav me-auto mb-2 mb-sm-0  icon-link-hover active `}
              >
                <li>
                  <NavLink
                    to="/"
                    className="nav-link px-2 link-body-emphasis text-light"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className="nav-link px-2 link-body-emphasis text-light"
                  >
                    About
                  </NavLink>
                </li>

                {user?.isAdmin && (
                  <>
                    <li>
                      <NavLink
                        to="open"
                        className="nav-link px-2 link-body-emphasis text-light"
                      >
                        open jobs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="pending"
                        className="nav-link px-2 link-body-emphasis text-light"
                      >
                        pending jobs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="completed"
                        className="nav-link px-2 link-body-emphasis text-light"
                      >
                        completed jobs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="alljobs"
                        className="nav-link px-2 link-body-emphasis text-light"
                      >
                        all jobs
                      </NavLink>
                    </li>
                  </>
                )}
                {user && (
                  <>
                    <li>
                      <NavLink
                        to={"/sign-out"}
                        className="nav-link px-2 link-body-emphasis text-light"
                      >
                        Sign Out
                      </NavLink>
                    </li>
                  </>
                )}

                {!user && (
                  <>
                    <li>
                      <NavLink
                        to={"/sign-up"}
                        className="nav-link px-2 link-body-emphasis text-light"
                      >
                        Sign up
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/sign-in"}
                        className="nav-link px-2 link-body-emphasis text-light"
                      >
                        Sign In
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="form-check form-switch mx-2 mx-sm-5">
          <label
            className="form-check-label"
            htmlFor="flexSwitchCheckDefault"
          ></label>
          {checked ? (
            <i className="bi bi-moon-stars"></i>
          ) : (
            <i className="bi bi-brightness-high-fill"></i>
          )}
          <input
            className={`form-check-input ${!checked && "bg-success"}`}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onChange={toggle}
          />
        </div>

        <form
          className="col-12 col-sm-6 col-lg-2 mb-3 mb-lg-0 me-lg-6"
          role="search"
        >
          {showSearch && (
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              value={search}
              onChange={handleInputChange}
              id="myInput"
            />
          )}
        </form>
      </header>
      <div
        style={{
          height:
            location.pathname === "/about" || location.pathname === "/sign-in"
              ? "85px"
              : "140px",
        }}
      ></div>
    </>
  );
};

export default Header;
