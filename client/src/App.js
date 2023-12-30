import React from "react";
import { Home } from "./Client/Pages/Home.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn } from "./Client/Pages/SignIn.js";
 
import "./App.scss";
import { SingUp } from "./Client/Pages/SingUp.js";
import { AddAnnonce } from "./Client/Pages/AddAnnonce.js";
 
import { ProtectedRoute } from "./Client/Components/ProtectedRoute.js";
import { Navbar } from "./Client/Components/Navbar.js";
import { Footer } from "./Client/Components/Footer.js";
import { ClientAnnonce } from "./Client/Pages/ClientAnnonce.js";
import { ClientInformation } from "./Client/Pages/ClientInformation.js";
import { ClientContact } from "./Client/Pages/ClientContact.js";
import { AdsDetails } from "./Client/Pages/AdsDetails.js";
 

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
          <Route path="/ClientAnnonce" element={<ClientAnnonce />} />
          <Route path="/ClientInformation" element={<ClientInformation />} />
          <Route path="/ClientContact" element={<ClientContact />} />
          <Route path="/AdsDetails/:id" element={<AdsDetails />} />
 
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
};
