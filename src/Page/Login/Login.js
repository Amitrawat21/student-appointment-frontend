import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../Redux/authSlice";
import axios from "axios";
import validation from "../../Validaion/Validaion";
import Teacher from "../Teacher/Teacher";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passShow, setPassShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
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
      const validationErrors = validation(newFormData, false);
      setErrors(validationErrors);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const validationErrors = validation(input, false);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:8000/auth/login", input);
        console.log(res);
        if (res.data.success) {
          console.log(res.data);
          dispatch(login(res.data));
          toast.success("Sign up successfully");
          setTimeout(() => {
            res.data.user.role == "Student"
              ? navigate("/home")
              : navigate("/teacher");
          }, 3000);
        } else {
          throw new Error(res.data.message || "Signup failed");
        }
      } catch (error) {
        if (error.response.status) {
          console.log(error.response, "responseeee");
          if (error.response.status === 400) {
            toast.error("Email  not found");
          } else if (error.response.status == 401) {
            toast.error("incorrec password");
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
        <div className="form_data-login">
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
            <p style={{ textAlign: "center" }}>fill all the details</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="enter your email address"
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
              <label htmlFor="password">password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="enter your password"
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

            <button className="btn" onClick={loginUser}>
              Sign up
            </button>
            <p>
              {" "}
              don't have account? <NavLink to="/register">signup</NavLink>{" "}
            </p>
          </form>
        </div>
        <ToastContainer autoClose={2500} />
      </section>
    </>
  );
};

export default Login;
