import axios from "axios";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { CardProduct } from "../Components/CardProduct";
export const ClientAnnonce = () => {
  const [productUser, setProductUser] = useState("");
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/project_announcement/get_UserProduct/${userID}`
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
  return (
    <div className="mt-5  d-flex justify-content-center">
      {productUser &&
        productUser.map((e, i) => (
          <Link
            key={i}
            style={{ textDecoration: "none" }}
            to={`/AdsDetails/${e._id}`}
          >
            <div className="mx-2">
              <CardProduct
                Product_Picture={`http://localhost:3000/${e.Product_Picture[0]}`}
                Product_Price={e.Product_Price}
                Product_Name={e.Product_Name}
                category={e.category}
                Product_Location={e.Product_Location}
                displayTime={e.displayTime}
              />
            </div>
          </Link>
        ))}
    </div>
  );
};
