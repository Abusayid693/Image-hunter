import React, { useState } from "react";
import "./images.css";



export default function ImageRender(props) {
  const [color, setColor] = useState("black");
  const [like, setLike] = useState(false);


  const handleLikeButton = () => {
    if (like) {
      setColor("black");
      setLike(false)
    } else {
      setColor("rgb(238, 28, 109)");
      setLike(true)
    }
  };


  const handleDownloadButton=()=>{
      alert(props.data.src.large)
  }


  return (
    <div className="image-block" style={{ backgroundColor: props.loading }}>
      <img src={props.data.src.medium} />
      <button className="btn1"style={{ color: color }} onClick={handleLikeButton}>
        <i className="fas fa-2x fa-heart"></i>
      </button>
      <button className="btn2"style={{ color: "black" }} onClick={handleDownloadButton}>
      <i className="fas fa-2x fa-download"></i>
      </button>
    </div>
  );
}
