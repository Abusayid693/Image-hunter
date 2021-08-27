import React, { useState,useEffect } from "react";
import { MySearchBar } from "./Components/Top-division/Top-division";
import { ImageContext, LoadingContext } from "./Components/Search Bar/search-bar";
import ImageRender from "./Components/Images/image";
import Button from "@material-ui/core/Button";
import "./app.css";

function App() {
  const [images, setImages] = useState([
    { src: { medium: "https://images.pexels.com/photos/4473405/pexels-photo-4473405.jpeg" } }, 
    { src: { medium: "https://images.pexels.com/photos/4473405/pexels-photo-4473405.jpeg" } }, 
    { src: { medium: "https://images.pexels.com/photos/4473405/pexels-photo-4473405.jpeg" } },
  ]);
  const [loading, setLoading] = useState(false);
  const [numOfImages, setnumOfImages] = useState(12);

  const LoadingContextValue = { loading, setLoading };
  const ImageContextValue = { images, setImages };


  const getMoreImages=()=>{
    setnumOfImages(numOfImages+3)
  }


  return (
    <div className="App" onscroll="scrolled(this)">
      <LoadingContext.Provider value={LoadingContextValue}>
        <ImageContext.Provider value={ImageContextValue}>
          <MySearchBar loading={loading} numOfImages={numOfImages} />
          <div className="images">
            {images.map((data) => (
              <ImageRender data={data} loading={loading} numOfImages={numOfImages} />
            ))}
          </div>
          <Button
          className="btn" 
          variant="contained"
           color="secondary"
           onClick={getMoreImages}
           >
            more
          </Button>
        </ImageContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
