import axios from "axios";
import React, { useEffect, useState } from "react";

import "../Scss/GalleryImage.scss";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

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

  return (
    <div className="d-flex justify-content-space-between">
      <div className="image-gallery-container">
        <ImageGallery
          items={galleryItems}
          showNav={false}
          renderItem={customRenderItem}
          showPlayButton={false}
          showFullscreenButton={false}
        />
      </div>
      {ads.map((e,i) => (
        <div className="ads-content" key={i}>
          <h3>{e.Product_Name}</h3>
          <p>{e.Product_Price}</p>
          <p>{e.category}</p>
          <hr/>
          <p>{e.Product_Description}</p>
        </div>
      ))}
    </div>
  );
};
