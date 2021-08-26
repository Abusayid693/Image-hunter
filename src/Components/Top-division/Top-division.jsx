import React, { useContext, useState,useEffect } from "react";
import "./style.css";
import searchBarBG from "./f.jpg";
import {Bar} from "../Search Bar/search-bar";
import CircularIndeterminate from "../Loader/loader"


 function MySearchBar(props) {

  return (
    <div className="search-bar">
      <div className="content">
        <h1>Search from 1000+ images</h1>

        <p>Image are loaded with pixel api</p>
      </div>
      <Bar numOfImages={props.numOfImages}/>
      <div className="position-bar">
      {props.loading && <CircularIndeterminate/>}
      </div>
      <img src={searchBarBG} />
    </div>
  );
}

export { MySearchBar };