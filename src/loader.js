import React from "react";
import "./loader.css";

export default function Loader() {
  return (
    <div className="loadingdiv w-100" style={{ height: `100vh ` }}>
      <div className="d-flex justify-content-center h-100">
        <div className="align-self-center">
          <div className="b b1"></div>
          <div className="b b2"></div>
          <div className="b b3"></div>
          <div className="b b4"></div>
        </div>
      </div>
    </div>
  );
}
