import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Login from "./pages/Login";
import Appointment from "./pages/Appointment";
import CreateAccount from "./pages/CreateAccount";
import ResetPassword from "./pages/ResetPassword";
import Test from "./pages/Test";
import Patient from "./pages/Patient";

import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/doctor/*" element={<Doctor />} />
        <Route path="/test/*" element={<Test />} />
        <Route path="/appointment/*" element={<Appointment />} />
        <Route path="/patient/*" element={<Patient />} />

        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
