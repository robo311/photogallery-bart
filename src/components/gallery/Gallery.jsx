import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import ImageCard from "../imageCard/imageCard";
import AddCard from "../addCard/AddCard";
import AddPhotoPortal from "../gallery/addPhoto/AddPhotoPortal";
import { BsArrowLeft } from "react-icons/bs";
import FullImagePortal from "./fullImagePortal/FullImagePortal";
import Loading from "../loading/Loading";
import Header from "../header/Header";
import Alert from "../alert/Alert";

function Gallery({ setError }) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [uploadedImage, setUploadedImage] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshFetching, setRefreshFetching] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    name: "",
    successful: false,
  });
  const { galleryPath } = useParams();

  const url = `http://api.programator.sk/gallery/${galleryPath}`;

  //Získanie dát z API
  const handleImagesData = async () => {
    try {
      if (galleryPath) {
        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              `Error ${response.status}. Gallery does not exist.`
            );
          } else {
            throw new Error(
              `Error ${response.status}. ${response.statusText}.`
            );
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
    setTimeout(() => setRefreshFetching(false), 100);
  }, [url, refreshFetching]);

  //Pridanie nového obrázku
  const handleAddNewImage = async () => {
    try {
      if (uploadedImage.length > 0) {
        console.log(uploadedImage);
        for (let i = 0; i < uploadedImage.length; i++) {
          const formData = new FormData();
          formData.append("images", uploadedImage[i], uploadedImage[i].name);
          const response = await fetch(url, {
            method: "POST",
            body: formData,
          });

          //Kontrola odozvy
          if (response.ok) {
            setUploadedImage([]);
            setAlertMessage({
              message: `Image successfully added!`,
              successful: true,
            });
            setRefreshFetching(true);
            setShowUploadModal(false);
          } else {
            throw new Error(
              `Error ${response.status}. ${response.statusText}.`
            );
          }
        }
      }
    } catch (error) {
      setError(error);
    }
  };

  //Vymazávanie obrázkov
  const handleImageRemove = async (imageId) => {
    try {
      const urlToDelete = `${url}/${imageId}`;

      const response = await fetch(urlToDelete, {
        method: "DELETE",
      });

      if (response.ok) {
        setAlertMessage({
          message: `Image successfully deleted!`,
          successful: true,
        });
        setRefreshFetching(true);
        setShowUploadModal(false);
      } else {
        throw new Error(`Error ${response.status}. ${response.statusText}.`);
      }
    } catch (error) {
      setError(error);
    }
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
        handleImageRemove={handleImageRemove}
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
              <AddCard setShowUploadModal={setShowUploadModal} />
            </div>

            {alertMessage.message && (
              <Alert
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
              />
            )}

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
                <AddPhotoPortal
                  setAlertMessage={setAlertMessage}
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
