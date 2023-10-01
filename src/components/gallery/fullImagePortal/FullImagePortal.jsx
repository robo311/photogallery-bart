import React, { useEffect, useState } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../../loading/Loading";

function FullImagePortal({
  onClose,
  imageData,
  setCurrentImageIndex,
  currentImageIndex,
}) {
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(
      `http://api.programator.sk/images/1212x909/${imageData[currentImageIndex].fullpath}`
    );
  }, [currentImageIndex]);

  const handleNextImage = () => {
    setCurrentImageIndex(currentImageIndex + 1);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(currentImageIndex - 1);
  };

  return (
    <div className="image-portal-wrapper">
      <div>
        <div onClick={onClose} className="close-image-btn">
          <AiOutlineClose size={24} color="white" />
        </div>

        <img src={image} alt={image} />
        <div className="slide-btn-wrapper">
          {!currentImageIndex <= 0 ? (
            <div
              onClick={handlePreviousImage}
              className="image-slide-btn left-btn"
            >
              <BsArrowLeft size={24} />
            </div>
          ) : (
            <div></div>
          )}

          {imageData.length - 1 !== currentImageIndex ? (
            <div
              onClick={handleNextImage}
              className="image-slide-btn right-btn"
            >
              <BsArrowRight size={24} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FullImagePortal;
