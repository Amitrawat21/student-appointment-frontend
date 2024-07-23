import React from "react";
import Navbar from "../../Component/Navbar/Navbar";
import "./Teacher.css";
const Teacher = () => {
  return (
    <>
      <Navbar />
      <div className="teacher-container">
        <div className="teacher-wrapper">
          <img src="https://cdn.vectorstock.com/i/1000x1000/03/67/cartoon-female-teacher-standing-next-to-a-blackboa-vector-4900367.jpg" />
        </div>
      </div>
    </>
  );
};

export default Teacher;
