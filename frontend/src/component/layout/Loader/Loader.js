import React from 'react';
import './Loader.css';
import profilePng from "../../../images/profile.jpeg";

const Loader = () => {
  return <div className="loading">
      <img style={{width:"100px", height:"100px"}}src={profilePng} alt="User" />
      <h1>Ruko jara , sabar karo.....</h1>
      <div>
      </div>
  </div>;
};

export default Loader;

