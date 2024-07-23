import React, { useState } from "react";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import validation from "../../Validaion/Validaion";
import Box from "@mui/material/Box";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [CpassShow, setCPassShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    institute: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });

    if (isSubmitted) {
      const newFormData = {
        ...input,
        [name]: value,
      };
      const validationErrors = validation(newFormData, true);
      setErrors(validationErrors);
    }
  };

  const addUserdata = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const validationErrors = validation(input, true);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const res = await axios.post(
          "http://localhost:8000/auth/register",
          input
        );
        console.log(res);
        if (res.data.success) {
          toast.success("Sign up successfully");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          throw new Error(res.data.message || "Signup failed");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            toast.error("Email is already in use");
          } else {
            toast.error("An unexpected error occurred");
          }
        } else if (error.request) {
          toast.error("Failed to connect to server. Please try again.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                zIndex: 1000,
              }}
            >
              please wait ... &nbsp;
              <CircularProgress />
            </Box>
          )}
          <div className="form_heading">
            <h1>SIGN UP</h1>
            <p style={{ textAlign: "center" }}>Fill all the details</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={input.name}
                onChange={setVal}
              />
              {isSubmitted && errors.name && (
                <p className="para" style={{ color: "red" }}>
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                value={input.email}
                onChange={setVal}
              />
              {isSubmitted && errors.email && (
                <p className="para" style={{ color: "red" }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={input.password}
                  onChange={setVal}
                />

                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "show" : "hide"}
                </div>
              </div>
              {isSubmitted && errors.password && (
                <p className="para" style={{ color: "red" }}>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="form_input">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                value={input.phone}
                onChange={setVal}
              />
              {isSubmitted && errors.phone && (
                <p className="para" style={{ color: "red" }}>
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="form_input-r">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={input.role}
                onChange={setVal}
              >
                <option style={{ color: "#8694a8" }} value="Select">
                  Select
                </option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
              {isSubmitted && errors.role && (
                <p className="para-r" style={{ color: "red" }}>
                  {errors.role}
                </p>
              )}
            </div>

            <div className="form_input-r">
              <label htmlFor="institute">Institute</label>
              <select
                id="institute"
                name="institute"
                value={input.institute}
                onChange={setVal}
              >
                <option style={{ color: "#8694a8" }} value="Select">
                  Select
                </option>
                <option value="ipec">ipec</option>
                <option value="abes">abes</option>
              </select>
              {isSubmitted && errors.institute && (
                <p className="para-r" style={{ color: "red" }}>
                  {errors.institute}
                </p>
              )}
            </div>

            <button className="btn" onClick={addUserdata}>
              Sign up
            </button>
            <p>
              Already have an account? <NavLink to="/">Log In</NavLink>
            </p>
          </form>
        </div>
        <ToastContainer autoClose={2500} />
      </section>
    </>
  );
};

export default Register;
