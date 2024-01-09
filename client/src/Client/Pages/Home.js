import React, { useEffect, useState } from "react";
import Banner from "../images/Banner.jpg";
import "../Scss/Home.scss";
import { Slidercategory } from "../Components/Slider";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { CardProduct } from "../Components/CardProduct";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Home = () => {
  const [productUser, setProductUser] = useState("");
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/project_announcement/GetAllProducts`
        );

        const result = await Promise.all(
          res.data.data.map(async (product) => {
            const categoryRes = await axios.get(
              `http://localhost:3000/project_announcement/getcategory/${product.Product_Category}`
            );

            const category = categoryRes.data.data;

            const createdAt = new Date(product.createdAt);
            const now = new Date();
            const timeDifference = now - createdAt;

            let displayTime;
            if (timeDifference < 60 * 1000) {
              displayTime = `${Math.floor(timeDifference / 1000)} seconds ago`;
            } else if (timeDifference < 60 * 60 * 1000) {
              displayTime = `${Math.floor(
                timeDifference / (60 * 1000)
              )} minutes ago`;
            } else if (timeDifference < 24 * 60 * 60 * 1000) {
              displayTime = `${Math.floor(
                timeDifference / (60 * 60 * 1000)
              )} hours ago`;
            } else if (timeDifference < 365 * 24 * 60 * 60 * 1000) {
              displayTime = `${Math.floor(
                timeDifference / (24 * 60 * 60 * 1000)
              )} days ago`;
            } else {
              displayTime = `${Math.floor(
                timeDifference / (365 * 24 * 60 * 60 * 1000)
              )} years ago`;
            }
            return {
              ...product,
              category: category.Cat_Name,

              displayTime,
            };
          })
        );

        setProductUser(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userID]);
  const sortedProducts = [...productUser].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const sliderSettings = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const getCategoryLink = (categoryName) => {
    return `/AllAds/${categoryName}`;
  };
  return (
    <div className="HomePage" style={{marginBottom:"150px"}}>
      <div className="Banner">
        <img src={Banner} className="BannerImg" alt="Banner" />
      </div>

      <div className="SliderCategory">
        <Slidercategory />
      </div>

      <div className="container ">
        <div className="d-flex justify-content-between">
          <h1>Recent product</h1>
          <Link to={getCategoryLink("recent")} className="link-no-decoration">
            <h1>
              Display all
              <FaLongArrowAltRight />
            </h1>
          </Link>
        </div>
        <div className="    ">
          <Slider {...sliderSettings}>
            {sortedProducts &&
              sortedProducts
              .filter((product) =>( product.state === "Approved" && new Date(product.Product_DateExpiration) >= new Date()))
                .map((product, index) => (
                  <Link
                    key={index}
                    to={`/AdsDetails/${product._id}`}
                    className="link-no-decoration "
                  >
                    <div
                      className="d-flex align-items-center justify-content-center "
                      style={{ height: "410px" }}
                    >
                      <CardProduct
                        Product_Picture={`http://localhost:3000/${product.Product_Picture[0]}`}
                        Product_Price={product.Product_Price}
                        Product_Name={product.Product_Name}
                        category={product.category}
                        Product_Location={product.Product_Location}
                        displayTime={product.displayTime}
                        style={{
                          textDecoration: "none !important",
                        }}
                      />
                    </div>
                  </Link>
                ))}
          </Slider>
        </div>
      </div>
      <div className="container ">
        <div className="d-flex justify-content-between">
          <h1>vehicules</h1>
          <Link to={getCategoryLink("Vehicles")} className="link-no-decoration">
            <h1 >
              Display all
              <FaLongArrowAltRight />
            </h1>
          </Link>
        </div>
        <div className="   ">
          <Slider {...sliderSettings}>
            {sortedProducts &&
              sortedProducts
                .filter((product) =>( product.state === "Approved" && new Date(product.Product_DateExpiration) >= new Date()))
                .map((product, index) => (
                  <Link
                    key={index}
                    to={`/AdsDetails/${product._id}`}
                    className="link-no-decoration "
                  >
                    <div
                      className="d-flex align-items-center justify-content-center "
                      style={{ height: "410px" }}
                    >
                      <CardProduct
                        Product_Picture={`http://localhost:3000/${product.Product_Picture[0]}`}
                        Product_Price={product.Product_Price}
                        Product_Name={product.Product_Name}
                        category={product.category}
                        Product_Location={product.Product_Location}
                        displayTime={product.displayTime}
                        style={{
                          textDecoration: "none !important",
                        }}
                      />
                    </div>
                  </Link>
                ))}
          </Slider>
        </div>
      </div>
      <div className="container ">
        <div className="d-flex justify-content-between">
          <h1>Clothing</h1>
          <Link to={getCategoryLink("Vehicles")} className="link-no-decoration">
            <h1 >
              Display all
              <FaLongArrowAltRight />
            </h1>
          </Link>
        </div>
        <div className="   ">
          <Slider {...sliderSettings}>
            {sortedProducts &&
              sortedProducts
                .filter((product) =>( product.state === "Approved" && new Date(product.Product_DateExpiration) >= new Date()))
                .map((product, index) => (
                  <Link
                    key={index}
                    to={`/AdsDetails/${product._id}`}
                    className="link-no-decoration "
                  >
                    <div
                      className="d-flex align-items-center justify-content-center "
                      style={{ height: "410px" }}
                    >
                      <CardProduct
                        Product_Picture={`http://localhost:3000/${product.Product_Picture[0]}`}
                        Product_Price={product.Product_Price}
                        Product_Name={product.Product_Name}
                        category={product.category}
                        Product_Location={product.Product_Location}
                        displayTime={product.displayTime}
                        style={{
                          textDecoration: "none !important",
                        }}
                      />
                    </div>
                  </Link>
                ))}
          </Slider>
        </div>
      </div>
      <div className="container ">
        <div className="d-flex justify-content-between">
          <h1>Real States</h1>
          <Link to={getCategoryLink("Vehicles")} className="link-no-decoration">
            <h1 >
              Display all
              <FaLongArrowAltRight />
            </h1>
          </Link>
        </div>
        <div className="   ">
          <Slider {...sliderSettings}>
            {sortedProducts &&
              sortedProducts
                .filter((product) =>( product.state === "Approved" && new Date(product.Product_DateExpiration) >= new Date()))
                .map((product, index) => (
                  <Link
                    key={index}
                    to={`/AdsDetails/${product._id}`}
                    className="link-no-decoration "
                  >
                    <div
                      className="d-flex align-items-center justify-content-center "
                      style={{ height: "410px" }}
                    >
                      <CardProduct
                        Product_Picture={`http://localhost:3000/${product.Product_Picture[0]}`}
                        Product_Price={product.Product_Price}
                        Product_Name={product.Product_Name}
                        category={product.category}
                        Product_Location={product.Product_Location}
                        displayTime={product.displayTime}
                        style={{
                          textDecoration: "none !important",
                        }}
                      />
                    </div>
                  </Link>
                ))}
          </Slider>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
      <Link
                  data-mdb-ripple-init
                  type="button"
                  to={getCategoryLink("recent")}
                  className="btn    "
                  style={{color: "#424242",border:"2px solid  #424242 ",borderRadius:"50px"}}
                >
                  Display All Ads
                </Link>
      </div>
    </div>
  );
};
