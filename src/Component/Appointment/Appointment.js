import React from "react";
import "./Appointment.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";


const Appointment = ({ appointment, setShow, show, setappointment }) => {
  const handleclose = () => {
    setShow(false);
  };
  const appointmentAccepted = async (confirm, id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/appointment/acceptAppoinment/${id}`,
        { status: confirm }
      );
      if (response.data.success) {
        alert("Appointment accepted");
      }
      setappointment((prev) => prev.filter((ele) => ele._id !== id));
    } catch (error) {
      console.error("Error accepting appointment:", error);
      toast.error("Failed to accept appointment");
    }
  };

  return (
    <div className="appointment">
      <CloseIcon onClick={handleclose} />

      <table className="table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointment.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.studentId.name}</td>
              <td>{new Date(appointment.date).toLocaleDateString()}</td>
              <td>{appointment.time}</td>
              <td>
                <button
                  onClick={() =>
                    appointmentAccepted("Confirm", appointment._id)
                  }
                >
                  Accept
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Appointment;
