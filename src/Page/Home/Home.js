import React, { useState, useEffect } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [teachers, setTeachers] = useState([]);
  const [input, setInput] = useState({
    teacherId: "",
    date: "",
    time: "",
  });

  console.log(input, "input");

 
  const handlesubmit = async () => {
    try {
      // Log the input and user ID to verify their values
      console.log("Submitting appointment with:", { ...input, studentId: user._id });

      const response = await axios.post(
        "http://localhost:8000/appointment/createAppoinment",
        { ...input, studentId: user._id }
      );

      // Log the response to verify its structure
      console.log("API response:", response.data);

      if (response.data.success) {
        setInput({
          teacherId: "",
          date: "",
          time: "",
        });
        alert("Please wait for the response", { autoClose: 2500 });
      } else {
        toast.error("Failed to create appointment", { autoClose: 2500 });
      }
    } catch (error) {
      console.error("Error creating appointment:", error.response || error.message || error);
      toast.error("An error occurred", { autoClose: 2500 });
    }
  };

  useEffect(() => {
    const gettingTeachers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/user/getAllteacher"
        );
        if (response.data.success) {
          setTeachers(response.data.allTeacher);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    gettingTeachers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="navbar-container">
        <div className="navbar-wrapper">
          <img
            src="https://arrivein.com/wp-content/uploads/2019/08/2-1024x484.png"
            alt="banner"
          />
          <form className="booking">
            <div className="teacher-booking">
              <h3>Please select teacher</h3>
              <select
                name="teacherId"
                value={input.teacherId}
                onChange={handleInputChange}
              >
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="date-booking">
              <h3>Please select date</h3>
              <input
                type="date"
                name="date"
                value={input.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="time-booking">
              <h3>Please select time</h3>
              <input
                type="time"
                name="time"
                value={input.time}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button onClick={handlesubmit}>submit</button>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Home;
