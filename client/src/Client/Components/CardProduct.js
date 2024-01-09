import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import Card from "react-bootstrap/Card";
import { BiSolidCategoryAlt } from "react-icons/bi";
import './Scss/Cardproduct.scss';
export const CardProduct = ({
  Product_Picture,
  Product_Price,
  Product_Name,
  category,
  Product_Location,
  displayTime,
  Product_DateExpiration
}) => {
  const isExpired = new Date(Product_DateExpiration) < new Date();
  return (
    <div className="mx-2   ">
      <Card className="  CardProduct"style={{ width: "13rem",  textDecoration: "none"  }}>
        <Card.Img
          style={{ height: "200px", objectFit: "cover" ,backgroundColor:"rgb(56, 56, 56)"}}
          variant="top"
          src={Product_Picture}
          alt={"Product_Picture"}
        />
  {isExpired && (
          <div className="expired-bar">
            <p>Expired</p>
          </div>
        )}
        <Card.Body>
          <Card.Title>
            <div style={{ color: "red", fontWeight: "bold" }}>
              {" "}
              {Product_Price}DT
            </div>

            <div
              style={{
                fontSize: "14px",
                overflow: "hidden",  textOverflow:" ellipsis", whiteSpace: "nowrap", width: "180px"
              }}
            >
              {Product_Name}
            </div>
          </Card.Title>
          <hr />
          <Card.Text style={{ opacity: "50%", fontSize: "11px" }}>
            <div>
              <BiSolidCategoryAlt /> {category}
            </div>

            <div>
              <FaLocationDot /> {`${Product_Location} , ${displayTime}`}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
