import React, { useEffect, useState } from "react";
import CategoryCard from "../categoryCard/CategoryCard";
import { createPortal } from "react-dom";
import AddCategoryPortal from "./addCategory/AddCategoryPortal";
import AddCard from "../addCard/AddCard";
import Loading from "../loading/Loading";
import Header from "../header/Header";
import { AiOutlineSearch } from "react-icons/ai";

function Category({ setError }) {
  const [showModal, setShowModal] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [newCategories, setNewCategories] = useState([]);
  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUrl = "http://api.programator.sk/gallery";

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
  }, [fetchUrl]);

  const handleAddCategory = () => {
    if (categoryValue !== "") {
      setNewCategories((current) => [...current, categoryValue]);
      setShowModal(false);
    }
  };

  const cardElement = galleryData
    ?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .map((item, index) => {
      const image = `http://api.programator.sk/images/304x228/${item.image.fullpath}`;
      const gallery = `http://api.programator.sk/gallery/${item?.path}`;

      return (
        <CategoryCard key={index} item={item} image={image} gallery={gallery} />
      );
    });

  const addedCardElements = newCategories
    .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
    .map((item, index) => {
      return <CategoryCard key={index} item={item} />;
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
              <input type="text" placeholder="Search a category" onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="category-cards-list">
              {cardElement}
              {newCategories ? addedCardElements : ""}
              <AddCard setShowModal={setShowModal} />
            </div>

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
