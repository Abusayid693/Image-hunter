import React, { useContext, useState, useEffect } from "react";
import ReactSearchBox from "react-search-box";
import "./bar.css";
import { createClient } from "pexels";

const client = createClient(
  "563492ad6f91700001000001563c3ddfa43143b3882bb052a2b7abbc"
);

// CONTEXT API
const ImageContext = React.createContext({
  images: [
    { src: { medium: "https://i.imgur.com/07t6nFn.png" } },
    { src: { medium: "https://i.imgur.com/07t6nFn.png" } },
    { src: { medium: "https://i.imgur.com/07t6nFn.png" } },
  ],
  setImages: () => {},
});

const LoadingContext = React.createContext({
  loading: false,
  setLoading: () => {},
});

export default function Bar(props) {
  const [value, setValue] = useState("random");
  const [num, setNum] = useState(props.numOfImages);

  const { padding, setImages } = useContext(ImageContext);
  const { loading, setLoading } = useContext(LoadingContext);

  // Filling the components initially with random images
  useEffect(() => {
    handleClick();
    handleEnterPress();
  }, []);

  useEffect(() => continueRender(props.numOfImages), [props.numOfImages]);

  const continueRender = (num) => {
    setNum(num);
    handleClick();
  };

  // Get image data from pixel apis
  const handleClick = () => {
    setLoading("rgb(245, 241, 241)");
    const query = value;
    client.photos.search({ query, per_page: num }).then((photos) => {
      setImages(photos.photos);
      console.log(photos.photos);
      setLoading(false);
    });
  };

  // Image search on enter press
  const handleEnterPress = () => {
    document.addEventListener("keypress", handlePress);
    function handlePress(e) {
      if (e.which === 13) {
        handleClick();
      }
    }
  };

  // Mostly searched topics can be put here
  const data = [
    {
      key: "Car",
      value: "Car",
    },
    {
      key: "Lion",
      value: "Lion",
    },
    {
      key: "Harry potter",
      value: "Harry potter",
    },
    {
      key: "Avengers",
      value: "Avengers",
    },
    {
      key: "Bike",
      value: "Bike",
    },
  ];

  return (
    <div className="my-bar">
      <div className="box">
        <ReactSearchBox
          className="box-t"
          placeholder="Search for images"
          data={data}
          onSelect={(record) => console.log(record)}
          onFocus={() => {
            console.log("This function is called when is focussed");
          }}
          onChange={(e) => setValue(e)}
          fuseConfigs={{
            threshold: 0.05,
          }}
          value={value}
        />
      </div>
      <button onClick={handleClick}>
        <i className="fa-2x fas fa-search"></i>
      </button>
    </div>
  );
}

export { Bar, ImageContext, LoadingContext };
