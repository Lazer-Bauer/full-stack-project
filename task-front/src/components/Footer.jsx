import { useAuth } from "../context/auth.context";
import { NavLink, useLocation } from "react-router-dom";
const Footer = () => {
  const { user, admin } = useAuth();
  const { checked } = useAuth();

  const location = useLocation();
  return (
    <footer
      className={` text-primary opacity-75  w-100 pt-5  p-0 ${
        checked ? "" : `bg-dark text-light opacity-100`
      } `}
    >
      <ul className="nav justify-content-center border-bottom pb-3 ">
        <li className="nav-item pe-5">
          <NavLink to="/" className="nav-link px-2 text-primary p-0">
            <i class="bi bi-house ps-3 fs-5 d-flex"></i>
            Home
          </NavLink>
        </li>
        <li className="nav-item pe-5">
          <NavLink to="/about" className="nav-link px-2 text-primary p-0">
            <i className="bi bi-info-circle ps-3 fs-5 d-flex"></i>
            About
          </NavLink>
        </li>
        {user && admin && (
          <li className="nav-item pe-5">
            <i className="bi bi-list-task ps-3 fs-5"></i>
            <NavLink to="/pending" className="nav-link px-2 text-primary p-0">
              pending jobs
            </NavLink>
          </li>
        )}
        {user && admin && (
          <li className="nav-item pe-5">
            <i className="bi bi-person-rolodex ps-4 fs-5"></i>
            <NavLink to="/alljobs" className="nav-link px-2 text-primary p-0">
              all jobs
            </NavLink>
          </li>
        )}
      </ul>
      <div
        className="copyRight text-center pe-5"
        style={{ height: location.pathname === "/sign-in" && "100px" }}
      >
        Eliezer Bauer
        <span className="mx-2">&copy;</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};
export default Footer;
