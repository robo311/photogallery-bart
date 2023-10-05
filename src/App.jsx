import React, { useState } from "react";
import Gallery from "./components/gallery/Gallery";
import Category from "./components/category/Category";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./components/errorPage/ErrorPage";

function App() {
  const [error, setError] = useState(null);
  const [newCategories, setNewCategories] = useState([]);

  return (
    <>
      {error ? (
        <ErrorPage error={error} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Category setError={setError} setNewCategories={setNewCategories} newCategories={newCategories} />} />
            <Route
              path="/:galleryPath"
              element={<Gallery setError={setError} setNewCategories={setNewCategories} newCategories={newCategories}/>}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
