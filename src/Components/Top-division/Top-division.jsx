import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import searchBarBG from "./f.jpg";
import { Bar } from "../Search Bar/search-bar";
import CircularIndeterminate from "../Loader/loader";

/* these */
const style1 = {
  backgroundColor: "white",

  height: "10vh",
  width: "100%",
  position: "fixed",
  color: "white",
  zIndex: "100",
  top: "0",
  transition: "0s",
};

function MySearchBar(props) {
  const [color, setColor] = useState();
  const [display, setDisplay] = useState();

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);

  const listenScrollEvent = (e) => {
    if (window.scrollY > 500) {
      setColor(style1);
      setDisplay("none");
    } else {
      setColor();
      setDisplay();
    }
  };
  // style={{ background: color}}

  return (
    <div className="search-bar" style={color}>
      <div className="content" style={{ display: display }}>
        <h1>Search from 1000+ images</h1>

        <p>Image are loaded with pixel api</p>
      </div>
      <Bar numOfImages={props.numOfImages} />
      <div className="position-bar">
        {props.loading && <CircularIndeterminate />}
      </div>
      <img src={searchBarBG} style={{ display: display }} />
    </div>
  );
}

export { MySearchBar };
