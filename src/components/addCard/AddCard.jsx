import React from "react";
import { BsPlusSquare } from "react-icons/bs";
import { useParams } from "react-router-dom";

function AddCard({ setShowUploadModal, setShowModal }) {
  const { galleryPath } = useParams();

  return (
    <div
      className="add-card-wrapper"
      onClick={() =>
        galleryPath ? setShowUploadModal(true) : setShowModal(true)
      }
    >
      <div>
        <BsPlusSquare opacity="32%" size={24} />
        <p>Pridať {galleryPath ? "fotku" : "kategóriu"}</p>
      </div>
    </div>
  );
}

export default AddCard;
