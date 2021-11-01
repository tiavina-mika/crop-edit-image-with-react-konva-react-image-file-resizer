import React from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

import mask from "../images/mask-deformed-circle.png";

import Slider from "../components/Slider";
import Typography from "../components/Typography";
import { useCropper, ZOOM_MAX, ZOOM_STEP } from "../hooks/useCropper";
import { useImageResize } from "../hooks/userImageResize";
import ResizedImage from "./ResizedImage";

const USER_IMAGE_LAYER = {
  width: 624,
  height: 591
  // width: 1162,
  // height: 1155,
};

const MASK_LAYER = {
  width: 624,
  height: 591,
  // width: 1162,
  // height: 1155,
  left: 0,
  right: 0
};

const ImageEditor = ({ image }) => {
  // Anonymous as crossOrigin to be able to do getImageData on it
  const [imageMask] = useImage(mask, "Anonymous");

  const {
    onZoom,
    zoom,
    minZoom,
    maxZoom,
    zoomStep,
    handleWheel,
    onDragEnd,
    x,
    y,
    imageRef,
    invertedMaskRef,
    stageRef
  } = useCropper({
    image,
    imageMask,
    layer: USER_IMAGE_LAYER,
    maskLayer: MASK_LAYER
  });

  const {
    resizedImage,
    initialSize,
    finalSize,
    initialImage,
    finalImage
  } = useImageResize({
    file: image,
    layer: MASK_LAYER,
    zoom
  });

  const onMouseEnter = (event) => {
    event.target.getStage().container().style.cursor = "move";
  };
  const onMouseLeave = (event) => {
    event.target.getStage().container().style.cursor = "default";
  };

  return (
    <div className="container flexCenter">
      <div className="m-t-20 m-b-20">
        <Typography variant="title" level={2}>
          Crop image
        </Typography>
      </div>
      <Stage
        ref={stageRef}
        width={USER_IMAGE_LAYER.width}
        height={USER_IMAGE_LAYER.height}
        onWheel={handleWheel}
        x={0}
        y={0}
        // style={{ backgroundColor: 'rgba(0, 0, 0, 0.8'}}
      >
        <Layer>
          {/* --------- user image ---------  */}
          <Image
            ref={imageRef}
            image={image}
            x={x}
            y={y}
            draggable
            onDragEnd={onDragEnd}
            scaleX={zoom}
            scaleY={zoom}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
          {/* --------- mask ---------  */}
          <Image
            image={invertedMaskRef.current}
            x={0}
            y={0}
            width={MASK_LAYER.width}
            height={MASK_LAYER.height}
            globalCompositeOperation="normal"
            opacity={0.7}
            listening={false} // equivalent to pointer events: none
          />
        </Layer>
      </Stage>
      <div className="flexCenter m-t-20 m-b-10">
        <Slider
          step={zoomStep}
          onChange={onZoom}
          defaultValue={minZoom}
          value={zoom}
          min={minZoom}
          max={maxZoom}
          tooltipVisible={false}
        />
      </div>
      <div className="flexCenter m-t-20">
        <div className="m-t-20 ">
          <Typography variant="title" level={2}>
            Image details and results
          </Typography>
        </div>
        <ResizedImage
          file={image}
          resizedImage={resizedImage}
          initialSize={initialSize}
          finalSize={finalSize}
          initialImage={initialImage}
          finalImage={finalImage}
        />
      </div>
    </div>
  );
};

export default ImageEditor;
