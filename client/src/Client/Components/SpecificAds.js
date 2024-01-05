import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CardProduct } from "./CardProduct";

import { Slidercategory } from "./Slider";

export const SpecificAds = () => {
  const { Cat_Name } = useParams();
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
            if (category.Cat_Name === Cat_Name) {
              return {
                ...product,
                category: category.Cat_Name,
                displayTime,
              };
            }
            return null;
          })
        );

        setProductUser(result.filter((product) => product !== null));
 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [Cat_Name, userID]);
  return (
    <div>
      <div className="  HomePage">
        <div className="SliderCategory">
          <Slidercategory />
        </div>
        <div className="container ">
          <div className="mt-5  d-flex jusitfy-content-center  flex-wrap ">
            {productUser &&
              productUser.map((product, index) => (
                <Link
                  key={index}
                  to={`/AdsDetails/${product._id}`}
                  className="link-no-decoration"
                >
                  <div className="mx-2 mt-5">
                    <CardProduct
                      Product_Picture={`http://localhost:3000/${product.Product_Picture[0]}`}
                      Product_Price={product.Product_Price}
                      Product_Name={product.Product_Name}
                      category={product.category}
                      Product_Location={product.Product_Location}
                      displayTime={product.displayTime}
                      style={{ textDecoration: "none !important" }}
                    />{" "}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
