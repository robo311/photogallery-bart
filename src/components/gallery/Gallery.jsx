import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import ImageCard from "../imageCard/imageCard";
import AddCard from "../addCard/AddCard";
import AddImagePortal from "../gallery/addPhoto/AddPhotoPortal";
import { BsArrowLeft } from "react-icons/bs";
import FullImagePortal from "./fullImagePortal/FullImagePortal";
import Loading from "../loading/Loading";
import Header from "../header/Header";

function Gallery({ setError, setNewCategories, newCategories }) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [newImageData, setNewImageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { galleryPath } = useParams();
  
  const url = `http://api.programator.sk/gallery/${galleryPath}`;
 
  const handleImagesData = async () => {
    try {
      if(galleryPath){
        
        const galleryPathInNewCategory = newCategories.some(category => category.includes(galleryPath))

        if(galleryPathInNewCategory){
          setTimeout(() => setLoading(false), 200);
          return;
        }

        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Error ${response.status}. Gallery does not exist.`);
          } else {
            throw new Error(`Error ${response.status}. ${response.statusText}.`);
          }
        }
        const data = await response.json();
        setImageData(data.images);
      }
      setTimeout(() => setLoading(false), 200);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    handleImagesData();
  }, [url]);

  const handleAddNewImage = () => {
    if (uploadedImage) {
      setNewImageData((current) => [...current, uploadedImage]);
    }
    setShowUploadModal(false);
    setUploadedImage(null);
  };

  const imageElement = imageData?.map((data, index) => {
    const image = `http://api.programator.sk/images/304x295/${data.fullpath}`;
 
    return (
      <ImageCard
        key={data.name}
        data={data}
        image={image}
        index={index}
        onClick={() => setCurrentImageIndex(index)}
        setShowImageModal={setShowImageModal}
      />
    );
  });

  const addedImagesElement = newImageData?.map((item, index) => {
    return (
      <ImageCard
        key={index}
        uploadedImage={item}
        onClick={() => setCurrentImageIndex(index)}
      />
    );
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <section className="images-list-wrapper">
            <div className="category-name-wrapper">
              <BsArrowLeft size={16} />
              <p>
                <Link className="gallery-link" to="/">
                  {galleryPath}
                </Link>
              </p>
            </div>
            <div className="images-list">
              {imageElement}
              {addedImagesElement}
              <AddCard setShowUploadModal={setShowUploadModal} />
            </div>
            {showImageModal &&
              createPortal(
                <FullImagePortal
                  setCurrentImageIndex={setCurrentImageIndex}
                  currentImageIndex={currentImageIndex}
                  imageData={imageData}
                  onClose={() => setShowImageModal(false)}
                />,
                document.body
              )}

            {showUploadModal &&
              createPortal(
                <AddImagePortal
                  handleAddNewImage={handleAddNewImage}
                  uploadedImage={uploadedImage}
                  setUploadedImage={setUploadedImage}
                  onClose={() => setShowUploadModal(false)}
                />,
                document.body
              )}
          </section>
        </>
      )}
    </>
  );
}

export default Gallery;
