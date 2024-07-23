import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import "./SudentAppoint.css"; // Import the CSS file

const SudentAppoint = () => {
  const [appointment, setAppointment] = useState([]);

  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const gettingStudentAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/appointment/getStudentAppoinment/${user._id}`
        );
        if (response.data.success) {
          setAppointment(response.data.allAppointment);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    gettingStudentAppointment();
  }, [user._id, token]);

  return (
    <div className="student-appoint-container">
      <h1>Student Appointments</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Teacher Name</th>
              <th>Phone Number</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointment.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.teacherId.name}</td>
                <td>{appt.teacherId.phone}</td>
                <td>{new Date(appt.date).toLocaleDateString()}</td>
                <td>{appt.time}</td>
                <td>{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SudentAppoint;
