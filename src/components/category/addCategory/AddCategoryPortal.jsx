import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function AddCategoryPortal({ onClose, setCategoryValue, handleAddCategory }) {
  return (
    <div className="background-modal-overlay">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2>Pridať kategóriu</h2>
          <button onClick={onClose}>
            <AiOutlineClose size={24} />
          </button>
        </div>
        <div className="input-category-wrapper">
          <div>
            <label>Názov kategórie *</label>
          </div>
          <input
            onChange={(e) => setCategoryValue(e.target.value)}
            type="text"
          />
          <button onClick={handleAddCategory} className="add-category">
            Pridať
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryPortal;
