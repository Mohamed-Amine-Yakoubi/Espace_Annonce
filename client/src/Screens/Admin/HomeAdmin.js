 
import React from 'react'
import {   useCookies } from 'react-cookie';

export const HomeAdmin = () => {
  const [ , setCookies] = useCookies("access_token");
  const handleLogout=()=>{
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userRole");
    setCookies("access_token","");
    window.location.reload(false);
  }
  return (
    <div>
      <h1>HomeAdmin</h1>
    <button className="nav-link" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i></button>
    </div>
  )
}
