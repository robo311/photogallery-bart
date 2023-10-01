import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noImg from "../../img/no-image.jpg";

function CategoryCard({ item, image, gallery }) {
  const [numberOfImages, setNumberOfImages] = useState(0);

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
      <Link to={`/${item?.path ? item.path : item}`}>
        <div className="numberofphotos-wrapper">
          <div>
            {numberOfImages}{" "}
            {numberOfImages < 2 && numberOfImages > 0 && "fotka"}{" "}
            {numberOfImages < 5 && numberOfImages > 1 && "fotky"}{" "}
            {numberOfImages >= 5 && "fotiek"} {numberOfImages === 0 && "fotiek"}
          </div>
          {image ? (
            <img className="card-img" src={image} alt={image?.name} />
          ) : (
            <img
              className="card-img"
              style={{ height: "228px", width: "304px" }}
              src={noImg}
              alt="no_image"
            />
          )}
        </div>
      </Link>
      {item.name ? <p>{item?.name}</p> : <p>{item}</p>}
    </div>
  );
}

export default CategoryCard;
