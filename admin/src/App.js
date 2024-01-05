import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./Admin/Components/ProtectedRoute.js";
import { SideBar } from "./Admin/Components/SideBar.js";
import { SignIn } from "./Admin/Pages/SignIn.js";
import { NavbarAdmin } from "./Admin/Components/NavbarAdmin.js";
import { UsersManagement } from "./Admin/Pages/UsersManagement.js";
import { ProductsManagement } from "./Admin/Pages/ProductsManagement.js";
import { CategoryManagement } from "./Admin/Pages/CategoryManagement.js";
import { ClientAds } from "./Admin/Components/ClientAds.js";
import { AdsDetails } from "./Admin/Components/AdsDetails.js";
export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const checkAuthentication = () => {
      setIsAuthenticated(!!cookies.access_token);
      setLoading(false); // Set loading to false once the authentication check is done
    };

    checkAuthentication();
  }, [cookies.access_token, setIsAuthenticated]);
  if (loading) {
    // You can render a loading indicator here
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
    
      </Routes>
      <div className="d-flex">
        {isAuthenticated && (
          <div className="col-auto">
            <NavbarAdmin />
            <SideBar  />
          </div>
        )}
        <div className="mt-5 mx-auto content" style={{paddingTop:"100px"}}>
          <Routes>
            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="*" element={<UsersManagement />} />
              <Route path="/" element={<UsersManagement />} />
              <Route path="/UsersManagement" element={<UsersManagement />} />
              <Route
                path="/ProductsManagement"
                element={<ProductsManagement />}
              />
              <Route
                path="/CategoryManagement"
                element={<CategoryManagement />}
              />
              <Route
                path="/UsersManagement/clientAds/:id"
                element={<ClientAds />}
              />
              <Route path="/AdsDetails/:id" element={<AdsDetails />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};
