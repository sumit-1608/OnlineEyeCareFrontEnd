import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Login from "./pages/Login";
import Appointment from "./pages/Appointment";
import CreateAccount from "./pages/CreateAccount";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/doctor/*" element={<Doctor />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </>
  );
}

export default App;
