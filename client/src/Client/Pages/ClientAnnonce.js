import axios from "axios";

import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Card from "react-bootstrap/Card";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
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
  console.log(productUser);
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
              <Card style={{ width: "14rem" }}>
                {e.Product_Picture.length >= 1 && (
                  <Card.Img
                    style={{ height: "220px", objectFit: "cover" }}
                    variant="top"
                    src={`http://localhost:3000/${e.Product_Picture[0]}`}
                    alt={e.Product_Picture[0]}
                  />
                )}
                <Card.Body>
                  <Card.Title style={{ color: "red", fontWeight: "bold" }}>
                    {e.Product_Price}DT
                  </Card.Title>
                  <Card.Title
                    style={{
                      fontSize: "16px",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      WebkitLineClamp: 2,
                    
                    }}
                  >
                    {e.Product_Name}
                  </Card.Title>
                  <hr />
                  <Card.Text style={{ opacity: "50%", fontSize: "12px" }}>
                    <BiSolidCategoryAlt /> {e.category}
                  </Card.Text>
                  <Card.Text style={{ opacity: "50%", fontSize: "12px" }}>
                    <FaLocationDot />{" "}
                    {`${e.Product_Location} , ${e.displayTime}`}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Link>
        ))}
    </div>
  );
};
