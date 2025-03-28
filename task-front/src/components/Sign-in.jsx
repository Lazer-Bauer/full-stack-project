import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import Joi from "joi";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { getUser } from "../services/userService";
const SignIn = () => {
  const { user, login } = useAuth();
  const { checked } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate(values) {
      const schema = Joi.object({
        email: Joi.string()
          .min(5)
          .required()
          .email({ tlds: { allow: false } }),
        password: Joi.string()
          .min(7)
          .max(20)
          .required()
          .pattern(new RegExp("(?=.*[0-9])"))
          .pattern(new RegExp("(?=.*[A-Z])"))
          .pattern(new RegExp("(?=.*[a-z])"))
          .pattern(new RegExp("(?=.*[!@#$%^&])")),
      });
      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }
      const errors = {};
      for (const detail of error.details) {
        // const key = detail.context.key;
        const key = detail.path[detail.path.length - 1];
        errors[key] = detail.message;
        console.log(detail);
      }
      return errors;
    },
    async onSubmit(values) {
      try {
        const response = await login(values);
        // await getUser();
        navigate("/");
      } catch (err) {
        console.log(err);
        if (err.response?.status !== 200) {
          toast.error("⚠️ The email or password you provide are not correct", {
            position: "top-center", // Position at top-center
            autoClose: 5000, // Auto-close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: checked ? "light" : "dark", // Adapt to dark mode
          });

          setServerError(err.response.data);
        }
      }
    },
  });
  return (
    <main
      style={{
        backgroundImage: `url('https://www.shutterstock.com/image-illustration/in…ss-technology-network-concept-600w-2113601942.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        zIndex: "-100",
      }}
      className={`form-signin w-25 pt-5 flex-grow-1 mt-0 w-100 ${
        checked ? "" : `bg-dark`
      }`}
    >
      <form onSubmit={form.handleSubmit} className="pt-5">
        <i class="bi bi-person d-flex justify-content-center text-white align-items-center"></i>
        <h1 className={"h3 mb-3 fw-normal text-center text-white "}>
          Please sign in
        </h1>

        <div className="form-floating pt-3 w-25 mx-auto text-center">
          <input
            {...form.getFieldProps("email")}
            type="email"
            className="form-control"
            placeholder="name@example.com"
            required
          />
          <span className="text-danger fs-6">
            {form.touched.email && form.errors.email}
          </span>
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating pt-2  w-25 mx-auto text-center">
          <input
            {...form.getFieldProps("password")}
            type="password"
            className="form-control"
            placeholder="Password"
            required
          />
          <span className="text-danger fs-6 mb-5">
            {form.touched.password && form.errors.password}
          </span>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary py-2 my-5  w-25 z-20 "
            disabled={!form.isValid}
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
    </main>
  );
};
export default SignIn;
