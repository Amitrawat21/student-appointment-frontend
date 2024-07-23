import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from './Page/Register/Register';
import Login from './Page/Login/Login';
import Home from './Page/Home/Home';
import Teacher from './Page/Teacher/Teacher';
import SudentAppoint from './Page/SudentAppoinments/SudentAppoint';
import Edit from './Page/Edit/Edit';



function App() {
  return (
<Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/teacher" element={<Teacher/>} />
        <Route path="/studentAppointment" element={<SudentAppoint/>} />
        <Route path="/Edit-profile" element={<Edit/>} />

       
      </Routes>
  );
}

export default App;
