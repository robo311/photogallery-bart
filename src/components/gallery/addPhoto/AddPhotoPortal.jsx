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

  const handlePictureUpload = (e) => {
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleDragAndDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          imageFiles.push(file);
          setUploadedImage([...uploadedImage], URL.createObjectURL(file));
        }
      });
    }
  };

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
            onDragOver={() => setDragOver(true)}
            onDragLeave={() => setDragOver(false)}
          >
            {!uploadedImage ? (
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
            {uploadedImage && (
              <div className="uploaded-image-wrapper">
                <div
                  onClick={() => setUploadedImage(null)}
                  className="close-uploaded-image"
                >
                  <AiOutlineClose />
                </div>
                <img src={uploadedImage} alt={uploadedImage} />
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
