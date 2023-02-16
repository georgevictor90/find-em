import React, { useEffect, useRef, useState } from "react";

import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config";

function Characters({
  handleImageLoad,
  gameOver,
  handleClick,
  handleResize,
  setInitialImgSize,
}) {
  const imgRef = useRef(null);
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    async function getURL() {
      try {
        const cartoonCharactersRef = ref(
          storage,
          "main-image/cartoon-characters.jpg"
        );
        const url = await getDownloadURL(ref(cartoonCharactersRef));
        setImgURL(url);
      } catch (error) {
        console.log(error);
      }
    }
    getURL();
  }, []);

  useEffect(() => {
    const imgElement = imgRef.current;
    setInitialImgSize(imgElement.width);
    window.addEventListener("resize", () => {
      handleResize(imgElement.width);
    });

    return () => {
      window.removeEventListener("resize", () => {
        handleResize(imgElement.current.width);
      });
    };
  });

  return (
    <img
      onLoad={handleImageLoad}
      ref={imgRef}
      src={imgURL}
      alt="Cartoon Characters"
      onClick={(e) => {
        e.stopPropagation();
        !gameOver && handleClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      }}
    />
  );
}

export default Characters;
