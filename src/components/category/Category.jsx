import React, { useEffect, useState } from "react";
import CategoryCard from "../categoryCard/CategoryCard";
import { createPortal } from "react-dom";
import AddCategoryPortal from "./addCategory/AddCategoryPortal";
import AddCard from "../addCard/AddCard";
import Loading from "../loading/Loading";
import Header from "../header/Header";
import { AiOutlineSearch } from "react-icons/ai";
import Alert from "../alert/Alert";

function Category({ setError }) {
  const [showModal, setShowModal] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [refreshFetching, setRefreshFetching] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    successful: "",
  });

  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUrl = "http://api.programator.sk/gallery";

  const requestBody = {
    name: categoryValue,
  };

  //Pridávanie kategórií
  const handleAddCategory = async () => {
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      //Kontrola API odozvy
      if (response.status === 201) {
        setAlertMessage({
          message: `Gallery ${categoryValue} successfully created!`,
          successful: true,
        });
        setRefreshFetching(true);
        setShowModal(false);
      } else if (response.status === 409) {
        setAlertMessage({
          message: "Gallery with this name already exists!",
          successful: false,
        });
      } else {
        throw new Error(`Error ${response.status}. ${response.statusText}.`);
      }
    } catch (error) {
      setError(error);
    }
  };

  //Vymazávanie kategórií
  const handleCategoryRemove = async (categoryUrl) => {
    try {
      const response = await fetch(categoryUrl, {
        method: "DELETE",
      });

      //Získanie mena kategórie
      const splitUrl = categoryUrl.split("/");
      const categoryName = splitUrl[splitUrl.length - 1];

      //Kontrola API odozvy 
      if (response.status === 200) {
        setAlertMessage({
          message: `Category ${categoryName} was successfully deleted!`,
          successful: true,
        });
        setRefreshFetching(true);
      } else if (response.status === 404) {
        setAlertMessage({
          message: `Category does not exists!`,
          successful: false,
        });
        setRefreshFetching(true);
      } else {
        throw new Error(`Error ${response.status}. ${response.statusText}.`);
      }
    } catch (error) {
      setError(error);
    }
  };

  //Získavanie dát z API
  const handleGalleryData = async () => {
    try {
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error(`Error ${response.status}. ${response.statusText}.`);
      }
      const data = await response.json();
      setGalleryData(data.galleries);
      setTimeout(() => setLoading(false), 300);
    } catch (error) {
      setError(error);
    }
  };

  
  useEffect(() => {
    handleGalleryData();
    setTimeout(() => setRefreshFetching(false), 100);
  }, [fetchUrl, refreshFetching]);

  //Vytváranie jednotlivých kartičiek kategórií
  const cardElement = galleryData?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .map((item, index) => {
      const image = `http://api.programator.sk/images/304x228/${item.image?.fullpath}`;
      const gallery = `http://api.programator.sk/gallery/${item?.path}`;

      return (
        <CategoryCard
          key={index}
          item={item}
          image={image}
          gallery={gallery}
          handleCategoryRemove={handleCategoryRemove}
        />
      );
    });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <section className="category-cards-wrapper">
            <p>Kategórie</p>
            <div className="search-input-wrapper">
              <span>
                <AiOutlineSearch size={20} />
              </span>
              <input
                type="text"
                placeholder="Search a category"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="category-cards-list">
              {cardElement}

              <AddCard setShowModal={setShowModal} />
            </div>

            {alertMessage.message && (
              <Alert
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
              />
            )}

            {showModal &&
              createPortal(
                <AddCategoryPortal
                  handleAddCategory={handleAddCategory}
                  setCategoryValue={setCategoryValue}
                  onClose={() => setShowModal(false)}
                />,
                document.body
              )}
          </section>
        </>
      )}
    </>
  );
}

export default Category;
