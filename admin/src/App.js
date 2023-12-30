import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AdminApp } from "./Admin/AdminApp.js";
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
        {isAuthenticated ? (
          <Route path="*" element={<AdminApp />} />
        ) : (
          <Route path="*" element={<SignIn />} />
        )}

        {isAuthenticated ? (
          <Route path="/" element={<AdminApp />} />
        ) : (
          <Route path="/" element={<SignIn />} />
        )}
      </Routes>
      <div className="d-flex">
        {isAuthenticated && (
          <div className="col-auto">
            <NavbarAdmin />
            <SideBar />
          </div>
        )}
        <div className="mt-5 mx-auto content">
          <Routes>
            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/AdminApp" element={<AdminApp />} />
              <Route
                path="/AdminApp/UsersManagement"
                element={<UsersManagement />}
              />
              <Route
                path="/AdminApp/ProductsManagement"
                element={<ProductsManagement />}
              />
              <Route
                path="/AdminApp/CategoryManagement"
                element={<CategoryManagement />}
              />
              <Route
                path="/AdminApp/UsersManagement/clientAds/:id"
                element={<ClientAds />}
              />
              <Route
                path="/AdsDetails/:id"
                element={<AdsDetails />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};
