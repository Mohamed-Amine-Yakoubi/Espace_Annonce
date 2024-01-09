import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className=" "style={{marginTop:"70px"}} >
      <section >
        <footer
          className="text-center text-white"
          style={{backgroundColor: "white"}}
        >
          <div className="container p-4 pb-0">
            <section className="">
              <p className="d-flex justify-content-center align-items-center" style={{color: "#424242"}}>
                <Link        className="btn    "   type="button" to="./SignUp"><span className="me-3">Register for free</span></Link>
                <Link
                  data-mdb-ripple-init
                  type="button"
                  to="./SignIn"
                  className="btn    "
                  style={{color: "#424242",border:"2px solid  #424242 ",borderRadius:"50px"}}
                >
                  Sign up!
                </Link>
              </p>
            </section>
          </div>

          <div
            className="text-center p-3"
            style={{color: "#424242"}}
          >
            © 2020 Copyright:
            <p   >
             Big Sale
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
};
