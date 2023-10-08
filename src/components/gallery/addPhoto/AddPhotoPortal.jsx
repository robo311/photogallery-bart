import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsImage } from "react-icons/bs";

function AddPhotoPortal({
  onClose,
  setUploadedImage,
  uploadedImage,
  handleAddNewImage,
}) {
  const [dragOver, setDragOver] = useState(false);
  
  //Upload fotiek
  const handlePictureUpload = (e) => {
    setUploadedImage([...uploadedImage, e.target.files[0]]);
  };

  //Drag and drop funkcia
  const handleDragAndDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.items).filter(
      (item) => item.kind === "file"
    );

    for (let i = 0; i < files.length; i++) {
      const file = files[i].getAsFile();
      setUploadedImage([...uploadedImage, file]);
    }
  };

  //Vymazanie uploadnutých fotiek
  const handleRemoveUploadedImg = (indexToRemove) => {
    const updatedUploadedImages = uploadedImage.filter((_, index) => index !== indexToRemove)
    setUploadedImage(updatedUploadedImages)
  }
  
  return (
    <div className="background-image-modal-overlay">
      <div className="modal-image-wrapper">
        <div className="modal-image-header">
          <h2>Pridať fotky</h2>
          <button onClick={onClose}>
            <AiOutlineClose size={24} />
          </button>
        </div>
        <div className="input-image-wrapper">
          <div
            className={`${dragOver ? "drag-over" : ""} drag-and-drop-wrapper`}
            onDrop={(e) => handleDragAndDrop(e)}
            onDragEnter={() => setDragOver(true)}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
          >
            {uploadedImage?.length >= 0 ? (
              <>
                <BsImage size={24} />
                <h4>Sem presuňte fotky</h4>
                <p>alebo</p>
                <input
                  id="upload"
                  onChange={(e) => handlePictureUpload(e)}
                  type="file"
                  accept="image/png , image/jpeg"
                />
                <label className="upload-files-label" htmlFor="upload">
                  Vyberte súbory
                </label>
              </>
            ) : (
              ""
            )}
            {uploadedImage?.length > 0 && (
              <div className="uploaded-image-wrapper">
                {uploadedImage.map((image, index) => (
                  <div key={index} className="uploaded-image-preview">
                    <div
                      onClick={() => handleRemoveUploadedImg(index)}
                      className="close-uploaded-image"
                    >
                      <AiOutlineClose />
                    </div>
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded img ${index}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleAddNewImage} className="add-category">
            Pridať
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPhotoPortal;
