import React, { useState } from "react";

function ImageCard({
  data,
  image,
  lowResImage,
  onClick,
  index,
  setShowImageModal,
  uploadedImage,
}) {
  const [loaded, setLoaded] = useState(false);
  console.log(loaded);
  return (
    <div onClick={() => onClick(index)} className="image-card-wrapper">
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
