import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noImg from "../../img/no-image.jpg";
import { AiFillDelete } from "react-icons/ai";

function CategoryCard({ item, image, gallery, handleCategoryRemove }) {
  const [numberOfImages, setNumberOfImages] = useState(0);
  const urlSegments = image.split("/")
  const imgFileName = urlSegments[urlSegments.length - 1]

  //Počet fotiek v galérií
  const handleNumberOfImages = async () => {
    if (gallery) {
      const response = await fetch(gallery);
      const galleryData = await response.json();
      setNumberOfImages(galleryData.images.length);
    }
  };

  useEffect(() => {
    handleNumberOfImages();
  }, [gallery]);
  
  return (
    <div className="card-wrapper">
        <div className="card">
          <div className="card-header">
            <div className="numberofphotos">
              {numberOfImages}{" "}
              {numberOfImages < 2 && numberOfImages > 0 && "fotka"}{" "}
              {numberOfImages < 5 && numberOfImages > 1 && "fotky"}{" "}
              {numberOfImages >= 5 && "fotiek"} {numberOfImages === 0 && "fotiek"}
            </div>
            <div className="remove-category-wrapper" onClick={() => handleCategoryRemove(`${gallery}`)}>
              <AiFillDelete color="black"/>
            </div>
          </div>
          <Link to={`/${item?.path ? item.path : item}`}>
          {imgFileName !== "undefined" ? (
            <img className="card-img" src={image} alt={image?.name} />
          ) : (
            <img
              className="card-img"
              style={{ height: "228px", width: "304px" }}
              src={noImg}
              alt="no_image"
            />
          )}
          </Link>
        </div>
      {item.name ? <p>{item?.name}</p> : <p>{item}</p>}
    </div>
  );
}

export default CategoryCard;
