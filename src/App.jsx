import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/User/UserLogin";
import CaptainLogin from "./pages/Captain/CaptainLogin";
import CaptainRegister from "./pages/Captain/CaptainRegister";
import UserRegister from "./pages/User/UserRegister";
import HomeLogged from "./pages/User/HomeLogged";
import CaptainHome from "./pages/Captain/CaptainHome";
import UserProtectorRoute from "../context/UserProtectorRoute";
import CaptainProtectorRoute from "../context/CaptainProtectorRoute";
import CaptainRiding from "./pages/Captain/CaptainRiding";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userLogin" element={<UserLogin />} />
      <Route path="/captainLogin" element={<CaptainLogin />} />
      <Route path="/captainRegister" element={<CaptainRegister />} />
      <Route path="/userRegister" element={<UserRegister />} />
      <Route path="/home" element={<UserProtectorRoute>
        <HomeLogged />
      </UserProtectorRoute>} />
      <Route path="/captain-home" element={<CaptainProtectorRoute>
        <CaptainHome />
      </CaptainProtectorRoute>}/>
    </Routes>
  );
};

export default App;