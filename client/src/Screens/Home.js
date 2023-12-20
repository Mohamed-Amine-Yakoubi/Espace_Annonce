import React from "react";
import Banner from "../images/Banner.jpg";
import "./ScreensScss/Home.scss";
import { Slidercategory } from "../Components/Slider";

export const Home = () => {
  return (
    <div className="  HomePage">
      <div className="Banner">
        <img src={Banner} className="BannerImg" alt="Banner" />
      </div>
      <div className="container">
        <Slidercategory />
      </div>
    </div>
  );
};
