import React from "react";
import { Home } from "./Pages/Home.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn } from "./Pages/SignIn.js";
import { ShoppingCart } from "./Client/Pages/ShoppingCart.js";
import "./App.scss";
import { SingUp } from "./Pages/SingUp.js";
import { AddAnnonce } from "./Client/Pages/AddAnnonce.js";
 
import { ProtectedRoute } from "./Components/ProtectedRoute.js";
import { Navbar } from "./Components/Navbar.js";
import { Footer } from "./Components/Footer.js";
 

export const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SingUp />} />
        <Route element={<ProtectedRoute role="client" />}>
          <Route path="/AddAnnonce" element={<AddAnnonce />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
};
