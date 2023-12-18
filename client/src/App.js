import React from "react";
import { Home } from "./Screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn } from "./Screens/SignIn";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer.js";
import { ShoppingCart } from "./Screens/Client/ShoppingCart.js";
import './App.scss'
import { SingUp } from "./Screens/SingUp.js";
import { AddAnnonce } from "./Screens/Client/AddAnnonce.js";
import { HomeAdmin } from "./Screens/Admin/HomeAdmin.js";
import { ProtectedRoute } from "./Components/ProtectedRoute.js";

export const App = () => {
  const userRole = localStorage.getItem("userRole");
  const renderFooter = () => {
    if (userRole !== "admin") {
      return (
        <div>
          <Footer />
        </div>
      );
    }
    return null;
  };
  const renderNavbar = () => {
    if (userRole !== "admin") {
      return (
        <div>
          <Navbar />
        </div>
      );
    }
    return null;
  };
  return (
    <Router>
      {renderNavbar()}
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SingUp />} />
        <Route element={<ProtectedRoute role="client" />}>
          <Route path="/AddAnnonce" element={<AddAnnonce />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
        </Route>
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/HomeAdmin" element={<HomeAdmin />} />
        </Route>
      </Routes>
      {renderFooter()}
    </Router>
  );
};
