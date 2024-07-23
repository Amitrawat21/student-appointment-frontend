import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import Appointment from "../Appointment/Appointment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../Redux/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [appointment, setappointment] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goProfileEdit = () => {
    navigate("/Edit-profile");
  };

  const showSudentAppointment = () => {
    navigate("/studentAppointment");
  };

  const logoutuser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(logout());
        navigate("/");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  const showAppointment = () => {
    setShow(true);
  };

  const deleteaccount =  async()=>{
    const response = await axios.delete(`http://localhost:8000/user/userDelete/${user._id}`)
    if(response.data.success){
      toast.success("account delete successfully delete")
      setTimeout(()=>{
       navigate('/')
      } , 2500)
    

    }

  }

  useEffect(() => {
    const gettingAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/appointment/getAllAppointment/${user._id}`
        );
        if (response.data.success) {
          setappointment(response.data.allAppointment);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    gettingAppointment();
  }, []);

  console.log(appointment, "appoinmen");
  console.log(user, "sssssssssss");

  return (
    <header>
      <nav>
        <h1>{user?.name}</h1>
        <div className="avatar">
          {user?.email ? (
            <Avatar style={{ backgroundColor: "green" }} onClick={handleClick}>
              <SettingsIcon />
            </Avatar>
          ) : (
            <Avatar style={{ backgroundColor: "blue" }} onClick={handleClick} />
          )}
        </div>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {user ? (
            <>
              <MenuItem
                onClick={() => {
                  goProfileEdit();
                  handleClose();
                }}
              >
                Profile Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logoutuser();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>

              <MenuItem
                onClick={() => {
                  deleteaccount();
                  handleClose();
                }}
              >
                Account delete
              </MenuItem>
              {user.role === "Teacher" && (
                <MenuItem onClick={handleClose}>
                  <div className="circleicon" onClick={showAppointment}>
                    <CircleNotificationsIcon
                      style={{ width: "30px", height: "40px", color: "red" }}
                    />
                    <h5>{appointment.length}</h5>
                  </div>
                </MenuItem>
              )}

              {user.role === "Student" && (
                <MenuItem
                  onClick={() => {
                    showSudentAppointment();
                    handleClose();
                  }}
                >
                  My appointment
                </MenuItem>
              )}
            </>
          ) : (
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          )}
        </Menu>
      </nav>
      <div className={show ? "showappointment" : "showappointmentnot"}>
        <Appointment
          appointment={appointment}
          setShow={setShow}
          show={show}
          setappointment={setappointment}
        />
      </div>
      <ToastContainer autoClose={2500} />
      
    </header>
  );
};

export default Navbar;
