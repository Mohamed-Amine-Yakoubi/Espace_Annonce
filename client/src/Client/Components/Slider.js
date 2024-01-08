import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Scss/Slider.scss";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";

export const Slidercategory = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/project_announcement/getAllCategories")
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((error) => {
        console.log(error.res.data.message);
      });
  }, []);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 982,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider">
      <div className="slider-container container-fluid mt-3">
        <Slider {...settings}>
          {category.map((e, i) => (
            <Link
              to={`/AllAds/${e.Cat_Name}`}
              key={i}
              className="link-no-decoration"
            >
              <div className="slider-item d-flex align-items-center justify-content-center">
                <img
                  src={`http://localhost:3000/${e.Cat_Picture[0]}`}
                  alt={e.Cat_Picture[0]}
                />
                <h5>{e.Cat_Name}</h5>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};
