import React from "react";

import { SideBar } from "../../Components/SideBar";
import { NavbarAdmin } from "../../Components/NavbarAdmin";
import { UsersManagement } from "./UsersManagement";

export const HomeAdmin = () => {
  return (
    <div>
      <NavbarAdmin />
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <SideBar />
        
        </div>
      </div> 
    </div>
  );
};
