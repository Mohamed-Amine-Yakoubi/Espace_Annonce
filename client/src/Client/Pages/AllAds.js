import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Banner from "../images/Banner.jpg";
import { Slidercategory } from "../Components/Slider";
import { CardProduct } from "../Components/CardProduct";
import "../Scss/AllAds.scss";
import TunisiaRegions from "./TunisiaRegions.js";
import { FormInput } from "../Components/FormInput.js";
import { Pagination } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
export const AllAds = () => {
  const { categoryName } = useParams();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);

  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [region, setRegion] = useState("");
  const [search, setSearch] = useState("");
  const [filteredAds, setFilteredAds] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/project_announcement/GetAllProducts"
        );

        const result = await Promise.all(
          res.data.data.map(async (product) => {
            const categoryRes = await axios.get(
              `http://localhost:3000/project_announcement/getcategory/${product.Product_Category}`
            );
            const categoryAds = categoryRes.data.data;
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
              categoryAds: categoryAds.Cat_Name,
              displayTime,
            };
          })
        );
        if (categoryName === "recent") {
          setAds(result);
        } else {
          const Data = result.filter((cat) => cat.categoryAds === categoryName);
          setAds(Data);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchData();
  }, [categoryName]);
  /***************************************  */
  const handleRegion = (event) => {
    setRegion(event.target.value);
  };

  useEffect(() => {
    const filterAdsByRegion = async () => {
      if (region === "") {
        setFilteredAds(ads);
      } else {
        const filtered = ads.filter(
          (product) =>
            product.Product_Location.toLowerCase() === region.toLowerCase()
        );
        setFilteredAds(filtered);
      }
    };
    filterAdsByRegion();
  }, [ads, region]);

  /********************** */
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    const ftilerDataBySerach = () => {
      if (search === "") {
        setFilteredAds(ads);
      } else {
        const filterd = ads.filter(
          (product) =>
            product.Product_Name.toLowerCase().includes(search.toLowerCase()) ||
            product.Product_Description.toLowerCase().includes(
              search.toLowerCase()
            ) ||
            product.categoryAds.toLowerCase().includes(search.toLowerCase()) ||
            product.Product_Location.toLowerCase().includes(
              search.toLowerCase()
            )
        );
        setFilteredAds(filterd);
      }
    };
    ftilerDataBySerach();
  }, [ads, search]);
  /******************* */
  const handleStartDate = (event) => {
    setDateStart(event.target.value);
  };
  const handleEndDate = (event) => {
    setDateEnd(event.target.value);
  };
  useEffect(() => {
    const filterbydate = () => {
      if (dateStart && dateEnd) {
        const filter = ads.filter((product) => {
          const productDate = new Date(product.createdAt)
            .toISOString()
            .split("T")[0];
          return productDate >= new Date(dateStart) && productDate <= dateEnd;
        });
        setFilteredAds(filter);
      } else {
        setFilteredAds(ads);
      }
    };
    filterbydate();
  }, [ads, dateEnd, dateStart]);

  /****************** */
  useEffect(() => {
    const filterAdsByPrice = async () => {
      const filtered = ads.filter(
        (product) =>
          product.Product_Price >= minPrice && product.Product_Price <= maxPrice
      );
      setFilteredAds(filtered);
    };
    filterAdsByPrice();
  }, [ads, minPrice, maxPrice]);

  const handleMinPriceChange = (event) => {
    setMinPrice(parseInt(event.target.value, 10));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(parseInt(event.target.value, 10));
  };
  /******************************************* */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page

  // Calculate the indexes for the current page
  const indexOfLastAd = Math.min(currentPage * itemsPerPage, filteredAds.length);
  const indexOfFirstAd = Math.min(indexOfLastAd - itemsPerPage, filteredAds.length);
  
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="AllAds">
      <div className="Banner">
        <img src={Banner} className="BannerImg" alt="Banner" />
      </div>

      <div className="SliderCategory">
        <Slidercategory />
      </div>

      <div className="container-fluid d-flex justify-content-between ">
        <div className="container-fluid filter-container mt-5 mx-5">
          <div>
            <div className="Searchbar">
              <div className=" input-container ">
                <FormInput
                  type="text"
                  placeholder="Search"
                  className=" searchbar FormInput"
                  onChange={handleSearch}
                />

                <FaSearch className="search-icon" />
              </div>
            </div>
            <div className="costumdroplist">
              <div className="inputfield select-container ">
                <label  className="mt-3 mb-2">Region </label>
                <select className="FormInput" onChange={handleRegion}>
                  <option className="FormInput " disabled value="" selected>
                    region
                  </option>
                  {TunisiaRegions.map((e) => (
                    <option className="FormInput" key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="PriceFilter ">
              <label className="mt-3 mb-2"> Price</label>
              <div className="d-flex   justify-content-between">
                <FormInput
                  type="number"
                  value={minPrice}
                  style={{ width: "100%", maxWidth: "110px" }}
                  className="FormInput mx-auto"
                  onChange={handleMinPriceChange}
                />

                <FormInput
                  type="number"
                  value={maxPrice}
                  style={{ width: "100%", maxWidth: "110px" }}
                  className="FormInput  mx-auto"
                  onChange={handleMaxPriceChange}
                />
              </div>
            </div>
            <div className="DateFilter">
              <label className="mt-3 mb-2"> Date</label>
              <div className="d-flex justify-content-between  ">
                <FormInput
                  type="date"
                  style={{ width: "100%", maxWidth: "110px" }}
                  onChange={handleStartDate}
                />

                <FormInput
                  type="date"
                  style={{ width: "100%", maxWidth: "110px" }}
                  onChange={handleEndDate}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid d-flex mt-4  ">
          <div className=" d-flex flex-wrap justify-content-center  ">
            {currentAds &&
              currentAds
                .filter((product) => product.state === "Approved")
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
                        category={product.categoryAds}
                        Product_Location={product.Product_Location}
                        displayTime={product.displayTime}
                        style={{
                          textDecoration: "none !important",
                        }}
                      />
                    </div>
                  </Link>
                ))}
                <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {[...Array(Math.ceil(filteredAds.length / itemsPerPage))].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
