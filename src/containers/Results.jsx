import React from "react";
import PropTypes from "prop-types";

import Typography from "../components/Typography";
import { Space } from "antd";

const Results = ({ size, dimensions, title }) => {
  return (
    <div>
      <Typography variant="title" level={4} className="underline">
        {title}
      </Typography>
      <Space className="flexColumn">
        <Typography className="extraSmallText">
          Size:&nbsp;
          <span className="bold">{size / 1000000} MB</span>
        </Typography>
        <Typography className="extraSmallText">
          Width:&nbsp;
          <span className="bold">{Math.round(dimensions?.width)}px</span>
        </Typography>
        <Typography className="extraSmallText">
          Height:&nbsp;
          <span className="bold">{Math.round(dimensions?.height)}px</span>
        </Typography>
      </Space>
    </div>
  );
};

Results.propTypes = {
  size: PropTypes.number,
  dimensions: PropTypes.any,
  title: PropTypes.string
};

export default Results;
