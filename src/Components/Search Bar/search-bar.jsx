import React, { useContext, useState, useEffect } from "react";
import ReactSearchBox from "react-search-box";
import { createClient } from "pexels";
import "./bar.css";

const client = createClient(
  "563492ad6f91700001000001563c3ddfa43143b3882bb052a2b7abbc"
);

const style1 = {
  position: "absolute",
  color: "black",
};

/* these */
const style2 = {
  position: "absolute",
  width: "60%",
  top: "14%",
  left: "8%",
  color: "black",
};

const myButtonStyle = { "backgroundColor": "black", "color": "white" };

// CONTEXT API
const ImageContext = React.createContext({
  images: [],
  setImages: () => {},
});

const LoadingContext = React.createContext({
  loading: false,
  setLoading: () => {},
});

export default function Bar(props) {
  const [value, setValue] = useState("boy");
  const [num, setNum] = useState(props.numOfImages);
  const [style, setStyle] = useState(style1);
  const [barHeight, setBarHeight] = useState("3.3rem");
  const [buttonStyle,setButtonStyle]=useState()

  const { padding, setImages } = useContext(ImageContext);
  const { loading, setLoading } = useContext(LoadingContext);

  // Filling the components initially with random images
  useEffect(() => {
    handleClick();
    handleEnterPress();
    window.addEventListener("scroll", listenScrollEvent);
  }, []);

  useEffect(() => continueRender(props.numOfImages), [props.numOfImages]);

  const listenScrollEvent = (e) => {
    if (window.scrollY > 500) {
      setStyle(style2);
      setBarHeight("3rem");
      setButtonStyle(myButtonStyle)
    } else {
      setStyle(style1);
      setBarHeight("3.3rem");
      setButtonStyle()
    }
  };

  const continueRender = (num) => {
    setNum(num + 9);
    handleClick();
  };

  // Get image data from pixel apis
  const handleClick = () => {
    setLoading("rgb(245, 241, 241)");
    const query = value;
    console.log(query);
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
        e.preventDefault();
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
    <div className="my-bar" style={style}>
      <div className="box">
        <ReactSearchBox
          inputBoxHeight={barHeight}
          className="box-t"
          inputBoxFontSize="1.2rem"
          inputBoxBorderColor="black"
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
      <button onClick={handleClick} style={Object.assign({ height: barHeight }, buttonStyle)} >
        <i className="fa-2x fas fa-search"></i>
      </button>
    </div>
  );
}

export { Bar, ImageContext, LoadingContext };
