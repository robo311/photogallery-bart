import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai"

function ImageCard({
  data,
  image,
  onClick,
  index,
  setShowImageModal,
  uploadedImage,
  handleImageRemove
}) {
  
  //Získanie mena obrázka
  const splitImageUrl = image.split("/")
  const imageName = splitImageUrl[splitImageUrl.length - 1]
  
  return (
    <div onClick={() => onClick(index)} className="image-card-wrapper">
      <div className="remove-img-wrapper" onClick={() => handleImageRemove(`${imageName}`)}>
        <AiFillDelete/>
      </div>
      {image ? (
        <img
          onClick={() => setShowImageModal(true)}
          src={image}
          alt={data.name}
        />
      ) : (
        <img src={uploadedImage} alt={uploadedImage} />
      )}
      {image?.path}
    </div>
  );
}

export default ImageCard;
