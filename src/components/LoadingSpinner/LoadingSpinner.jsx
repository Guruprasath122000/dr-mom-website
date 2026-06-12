import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ text = "Loading..." }) => (
  <div className="spinner-wrap">
    <div className="spinner">
      <div className="spinner__ring spinner__ring--outer" />
      <div className="spinner__ring spinner__ring--inner" />
      <span className="spinner__star">✦</span>
    </div>
    {text && <p className="spinner__text">{text}</p>}
  </div>
);

export default LoadingSpinner;
