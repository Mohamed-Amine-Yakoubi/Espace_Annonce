import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Scss/AdsDetails.scss";
import "../Scss/GalleryImage.scss";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
export const AdsDetails = () => {
  const [ads, setAds] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/project_announcement/get_specProductById/${id}`
        );

        const productData = res.data.data;

        const categoryRes = await axios.get(
          `http://localhost:3000/project_announcement/getcategory/${productData.Product_Category}`
        );

        const category = categoryRes.data.data;

        const updatedProduct = {
          ...productData,
          category: category.Cat_Name,
        };

        setAds([updatedProduct]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const galleryItems = ads.flatMap((ad) =>
    ad.Product_Picture.map((picture, index) => ({
      original: `http://localhost:3000/${picture}`, // Replace with the correct base URL
      thumbnail: `http://localhost:3000/${picture}?thumbnail=true`, // Add a query parameter for custom thumbnail
      description: `Image ${index + 1}`, // Add a description for each image
    }))
  );

  const imageStyles = {
    objectFit: "cover", // or "contain" based on your requirement
    height: "400px", // Set your preferred max height
    width: "500px", // Set your preferred max width
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
          style={{ width: '100%', height: '60px', objectFit: 'cover' }}
        />
      </div>
    );
  };
  return (
    <div>
    <div className="container-fluid mt-5 mb-5 d-flex justify-content-space-between AdsDetails">
      <div className="image-gallery-container  mx-5   ">
        <ImageGallery
          items={galleryItems}
          showNav={false}
          renderItem={customRenderItem}
          showPlayButton={false}
          showFullscreenButton={false}
          renderThumbInner={customRenderThumbInner}
        />
      </div>
      {ads.map((e, i) => (
        <div className="AdsContent " key={i}>
          <h3>{e.Product_Name}</h3>
          <h2>{e.Product_Price}<span> DT</span></h2>
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
        </div>
      ))}
    </div>
  </div>
  );
};
