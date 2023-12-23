import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        {category.map((e, i) => (
          <div>
            <h3 key={i}>{e.Cat_Name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};
