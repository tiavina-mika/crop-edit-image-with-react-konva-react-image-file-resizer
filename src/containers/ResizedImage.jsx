import React from "react";
// import { useImageResize } from "../hooks/userImageResize";

const ResizedImage = ({ file, initialSize, finalSize, resizedImage }) => {
  return (
    <div className="flexCenter p-x-20 p-y-20">
      <div>
        <h5>
          Initial Size: <b>{initialSize / 1000000} MB</b> <br />
          Final Size: <b>{finalSize / 1000000} MB</b>
        </h5>
      </div>

      {file && (
        <div className="flexCenter  m-t-25">
          <h3>Original image ({initialSize / 1000000} MB)</h3>
          <img alt="original" src={file.src} />
        </div>
      )}
      <div className="flexCenter m-t-25">
        <h3>Resized image ({finalSize / 1000000})</h3>
        <img alt="resized" src={resizedImage} />
      </div>
    </div>
  );
};

export default ResizedImage;
