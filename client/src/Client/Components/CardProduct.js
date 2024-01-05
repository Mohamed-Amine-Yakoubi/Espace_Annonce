 

import React  from "react";
import { FaLocationDot } from "react-icons/fa6";
import Card from "react-bootstrap/Card";
import { BiSolidCategoryAlt } from "react-icons/bi";
 

export const CardProduct = ({Product_Picture,Product_Price,Product_Name,category,Product_Location,displayTime}) => {
  return (
 
          <div className="mx-2">
            <Card style={{ width: "14rem" ,textDecoration:"none"}}>
       
                <Card.Img
                  style={{ height: "220px", objectFit: "cover" }}
                  variant="top"
                  src={Product_Picture}
                  alt={"Product_Picture"}
                />
          
              <Card.Body>
                <Card.Title style={{ color: "red", fontWeight: "bold" }}>
                  {Product_Price}DT
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "16px",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                  height:"40px"
                  }}
                >
                  {Product_Name}
                </Card.Title>
                <hr />
                <Card.Text style={{ opacity: "50%", fontSize: "12px" }}>
                  <BiSolidCategoryAlt /> {category}
                </Card.Text>
                <Card.Text style={{ opacity: "50%", fontSize: "12px" }}>
                  <FaLocationDot />{" "}
                  {`${Product_Location} , ${displayTime}`}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
 
  )
}
