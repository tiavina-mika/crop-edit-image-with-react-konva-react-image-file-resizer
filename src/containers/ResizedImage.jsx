import React from "react";
import PropTypes from "prop-types";

import Typography from "../components/Typography";
import { Space } from "antd";
import Results from "./Results";
import { IMAGE_RESIZE_MARGIN } from "../styles/constants";

const ResizedImage = ({
  file,
  initialSize,
  finalSize,
  resizedImage,
  initialImage,
  finalImage
}) => {
  return (
    <div className="flexCenter p-x-25 p-y-25">
      <div className="flexRow">
        <Space size={70}>
          <Results
            title="Initial image"
            size={initialSize}
            dimensions={initialImage}
          />
          <Results
            title="Final image"
            size={finalSize}
            dimensions={finalImage}
          />
        </Space>
      </div>

      {file && (
        <div className="flexCenter  m-t-25">
          <h3>Original image ({initialSize / 1000000} MB)</h3>
          <img alt="original" src={file.src} />
        </div>
      )}
      <div className="flexCenter m-t-25">
        <h3>
          Resized image ({finalSize / 1000000}) [with margin x
          {IMAGE_RESIZE_MARGIN}]
        </h3>
        <img alt="resized" src={resizedImage} />
      </div>
    </div>
  );
};

ResizedImage.propTypes = {
  initialSize: PropTypes.number,
  finalSize: PropTypes.number,
  file: PropTypes.any,
  resizedImage: PropTypes.any,
  initialImage: PropTypes.any,
  finalImage: PropTypes.any
};

export default ResizedImage;
