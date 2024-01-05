import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdChatbubbles, IoMdOptions } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "../Scss/AdsDetails.scss";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { GrValidate } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";

export const AdsDetails = () => {
  const [ads, setAds] = useState([]);
  const [user, setUser] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [cookies] = useCookies(["access_token"]);

  let { id } = useParams();
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/project_announcement/get_specProductById/${id}`
      );

      const productData = res.data.data;
      const userID = res.data.data.createdBy;

      const categoryRes = await axios.get(
        `http://localhost:3000/project_announcement/getcategory/${productData.Product_Category}`
      );

      const userRes = await axios.get(
        `http://localhost:3000/project_announcement/GetUserById/${userID}`
      );
      setUser(userRes.data.data);
      const category = categoryRes.data.data;
      const createdAt = new Date(productData.createdAt);
      const now = new Date();
      const timeDifference = now - createdAt;

      let displayTime;
      if (timeDifference < 60 * 1000) {
        displayTime = `${Math.floor(timeDifference / 1000)} seconds ago`;
      } else if (timeDifference < 60 * 60 * 1000) {
        displayTime = `${Math.floor(timeDifference / (60 * 1000))} minutes ago`;
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
      const updatedProduct = {
        ...productData,
        category: category.Cat_Name,
        displayTime,
      };

      setAds([updatedProduct]);
    } catch (error) {
      console.error(error);
    }
  }, [id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const galleryItems = ads.flatMap((ad) =>
    ad.Product_Picture.map((picture, index) => ({
      original: `http://localhost:3000/${picture}`, // Replace with the correct base URL
      thumbnail: `http://localhost:3000/${picture}?thumbnail=true`, // Add a query parameter for custom thumbnail
      description: `Image ${index + 1}`, // Add a description for each image
    }))
  );

  const imageStyles = {
    backgroundColor: "black",
    objectFit: "scale-down", // or "contain" based on your requirement
    height: "400px", // Set your preferred max height
    width: "500px", // Set your preferred max width
    borderRadius: "12px",
  };

  const customRenderItem = (item) => {
    return (
      <div className="image-gallery-image">
        <img src={item.original} alt={item.description} style={imageStyles} />
      </div>
    );
  };
  const customRenderThumbInner = (item) => {
    return (
      <div className="image-gallery-thumbnail-inner">
        <img
          src={item.thumbnail}
          alt={item.description}
          style={{ width: "100%", height: "60px", objectFit: "cover" }}
        />
      </div>
    );
  };
  const handleshowphone = () => {
    setIsVisible(!isVisible);
  };

  const HandleStateApproved = async () => {
    try {
      await axios.put(
        `http://localhost:3000/project_announcement/UpdateStateProduct/${id}`,
        { state: "Approved" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      toast.success("ad has been successfully approved");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  const HandleStateRejected = async () => {
    try {
      await axios.put(
        `http://localhost:3000/project_announcement/UpdateStateProduct/${id}`,
        { state: "Rejected" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );

      toast.success("ad has been successfully rejected");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Toaster />

      <div className="container-fluid mt-5 mb-5 d-flex justify-content-space-between AdsDetails">
        <div className="image-gallery-container  mx-5   ">
          <ImageGallery
            items={galleryItems}
            showNav={false}
            renderItem={customRenderItem}
            showPlayButton={false}
            showFullscreenButton={true}
            renderThumbInner={customRenderThumbInner}
          />
        </div>
        {ads.map((e, i) => (
          <div className="AdsContent container" key={i}>
            {user.map((user, index) => (
              <div className="user-contact " key={index}>
                <div className="d-flex justify-content-end">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <IoMdOptions className="iconOption" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <button
                          className="btn mx-2"
                          onClick={HandleStateApproved}
                        >
                          <GrValidate
                            className="iconOption "
                            style={{ color: "green" }}
                          />
                          <span className="mx-2" style={{ color: "green" }}>
                            Approved
                          </span>
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <button
                          className=" mx-2 btn"
                          onClick={HandleStateRejected}
                        >
                          <TiDeleteOutline
                            className="iconOption "
                            style={{ color: "red" }}
                          />
                          <span className="mx-2" style={{ color: "red" }}>
                            rejcted
                          </span>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center pt-1 ps-5">
                    <FaUserCircle className="icon" />
                    <p className="mt-3 mx-2">
                      {user.User_name} {user.User_firstname}
                    </p>
                  </div>
                  <div className="d-flex align-items-center pt-1 ps-5">
                    <div>
                      <div>
                        <Link className="btn mb-3 mx-5" to="/ChatClients">
                          <IoMdChatbubbles /> chat with the seller
                        </Link>
                      </div>
                      <div>
                        {!isVisible && (
                          <button
                            className="btn  mx-5 btnCall"
                            onClick={handleshowphone}
                          >
                            <FaPhoneAlt /> show number
                          </button>
                        )}
                        {isVisible && (
                          <p className="mt-3 mx-5">+216 {user.User_phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <h3>{e.Product_Name}</h3>
            <h2>
              {e.Product_Price}
              <span> DT</span>
            </h2>
            <div className="mt-5 mb-5">
              <p>
                <BiSolidCategoryAlt
                  style={{
                    opacity: "90%",
                    fontSize: "14px",
                    marginRight: "6px",
                  }}
                />
                {e.category}
              </p>
              <p>
                <FaLocationDot
                  style={{
                    opacity: "90%",
                    fontSize: "14px",
                    marginRight: "6px",
                  }}
                />
                {`${e.Product_Location} , ${e.displayTime}`}
              </p>
            </div>
            <hr />
            <h4>Description</h4>
            <p>{e.Product_Description}</p>
            <p
              style={{
                color:
                  e.state === "Approved"
                    ? "green"
                    : e.state === "pending"
                    ? "#ff9966"
                    : "red",
              }}
            >
              {e.state}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
