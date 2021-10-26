import React from "react";
import { useImageResize } from "../hooks/userImageResize";

const ImageResize = ({ file }) => {
  const { resizedImage, initialSize, finalSize } = useImageResize({ file });

  return (
    <div className="flexCenter p-x-20 p-y-20">
      <div>
        <h5>
          Initial Size: {initialSize / 1000000} MB <br />
          Final Size: {finalSize / 1000000} MB
        </h5>
      </div>

      <div>
        <img alt="drawing" src={resizedImage} />
      </div>
    </div>
  );
};

export default ImageResize;
