import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/authSlice";
import axios from "axios";
import "./Edit.css";

const Edit = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // Add other fields as needed
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        // Add other fields as needed
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(formData, "formdaa");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/user/userUpdate/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `${token}`, // Ensure the token format is correct
          },
        }
      );
      console.log(response.data, "response");
  
      if (response.data.success) {
        dispatch(login(response.data)); // Update the state with the new user data
        alert("User updated successfully!");
        // Optionally, you can redirect or update the state to reflect changes
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  

  return (
    <div className="edit-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        {/* Add other fields as needed */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Edit;
