import { useEffect, useMemo, useState, useRef, useCallback } from "react";

export const ZOOM_STEP = 0.1;
export const ZOOM_MAX = 4;

/**
 * create another canvas to invert the mask color
 * @param {*} image
 */
const invertMask = (image) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, image.width, image.height);

  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const data = imageData.data;

  for (let i = 0, n = data.length; i < n; i += 4) {
    data[i] = 0; // red
    data[i + 1] = 0; // green
    data[i + 2] = 0; // blue
    data[i + 3] = 255 - data[i + 3]; // alpha
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

const centerZoom = ({ maskLayer, stage, oldZoom, newZoom, imageNode }) => {
  const containerWidth = maskLayer ? maskLayer.width : stage.width();
  const containerHeight = maskLayer ? maskLayer.height : stage.width();

  const mousePointTo = {
    x: containerWidth / 2 / oldZoom - imageNode.x() / oldZoom,
    y: containerHeight / 2 / oldZoom - imageNode.y() / oldZoom
  };

  const newX = (containerWidth / 2 / newZoom - mousePointTo.x) * newZoom;
  const newY = (containerHeight / 2 / newZoom - mousePointTo.y) * newZoom;
  return {
    newX,
    newY
  };
};

export const degToRad = (angle) => {
  return (angle / 180) * Math.PI;
};

export const getCenter = (shape) => {
  const angleRad = degToRad(shape.rotation || 0);
  return {
    x:
      shape.x +
      (shape.width / 2) * Math.cos(angleRad) +
      (shape.height / 2) * Math.sin(-angleRad),
    y:
      shape.y +
      (shape.height / 2) * Math.cos(angleRad) +
      (shape.width / 2) * Math.sin(angleRad)
  };
};

export const rotateAroundPoint = (shape, deltaDeg, point) => {
  const angleRad = degToRad(deltaDeg);
  const x = Math.round(
    point.x +
      (shape.x - point.x) * Math.cos(angleRad) -
      (shape.y - point.y) * Math.sin(angleRad)
  );
  const y = Math.round(
    point.y +
      (shape.x - point.x) * Math.sin(angleRad) +
      (shape.y - point.y) * Math.cos(angleRad)
  );
  return {
    ...shape,
    rotation: Math.round(shape.rotation + deltaDeg),
    x,
    y
  };
};

export const rotateAroundCenter = (shape, deltaDeg) => {
  const center = getCenter(shape);
  return rotateAroundPoint(shape, deltaDeg, center);
};

export const useCropper = ({ image, imageMask, layer, maskLayer }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const [maxZoom, setMaxZoom] = useState(1);
  const [zoomStep, setZoomStep] = useState(1);
  const [rotation, setRotation] = useState(0);
  const invertedMaskRef = useRef();
  const imageRef = useRef();
  const stageRef = useRef();

  const complete = !!imageMask?.complete;
  useMemo(() => {
    if (!imageMask) return;
    if (complete) {
      invertedMaskRef.current = invertMask(imageMask);
    }
  }, [complete, imageMask]);

  useEffect(() => {
    if (!image) return;
    let defaultZoom;

    if (image.naturalHeight >= image.naturalWidth) {
      defaultZoom = layer.width / image.naturalWidth;
    } else {
      defaultZoom = layer.height / image.naturalHeight;
    }

    setMinZoom(defaultZoom);
    setZoom(defaultZoom);
    setMaxZoom(defaultZoom * 2);
    setZoomStep(defaultZoom / 10);

    const containerWidth = maskLayer ? maskLayer.width : layer.width();
    const containerHeight = maskLayer ? maskLayer.height : layer.width();

    const mousePointTo = {
      x: containerWidth / 2 - image.x,
      y: containerHeight / 2 - image.y
    };

    // center horizontaly
    if (image.naturalHeight <= image.naturalWidth) {
      const newX = (containerWidth / 2 - mousePointTo.x) * defaultZoom;
      newX > 0 ? setX(-newX) : setX(newX);
      // center varticaly
    } else {
      const newY = (containerHeight / 2 - mousePointTo.y) * defaultZoom;
      newY > 0 ? setY(-newY) : setY(newY);
    }
  }, [image, layer, maskLayer]);

  // get the last updated cropped image value
  const croppedValue = useMemo(() => {
    if (!image) return;

    const imageBounds = {
      imageLeft: x * zoom,
      imageTop: y * zoom,
      imageWidth: image.naturalWidth * zoom,
      imageHeight: image.naturalHeight * zoom
    };

    return imageBounds;
  }, [image, zoom, x, y]);

  const onDragEnd = (e) => {
    setX(e.target.x());
    setY(e.target.y());
  };
  // console.log("croppedValue", croppedValue);

  const handleWheelRelativeToPointer = (e) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();

    const imageNode = imageRef.current;
    const oldZoom = imageNode.scaleX();

    // wheel down = zoom+, wheel up = zoom-
    const newZoom = e.evt.deltaY > 0 ? oldZoom + zoomStep : oldZoom - zoomStep;

    if (newZoom < minZoom) return;
    setZoom(newZoom);

    // always center the image when zooming
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldZoom - imageNode.x() / oldZoom,
      y: stage.getPointerPosition().y / oldZoom - imageNode.y() / oldZoom
    };

    const newX =
      (stage.getPointerPosition().x / newZoom - mousePointTo.x) * newZoom;
    const newY =
      (stage.getPointerPosition().y / newZoom - mousePointTo.y) * newZoom;
    setX(newX);
    setY(newY);
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();

    const imageNode = imageRef.current;
    const oldZoom = imageNode.scaleX();

    // wheel down = zoom+, wheel up = zoom-
    const newZoom = e.evt.deltaY < 0 ? oldZoom + zoomStep : oldZoom - zoomStep;

    if (newZoom < minZoom || newZoom > maxZoom) return;
    setZoom(newZoom);

    const { newX, newY } = centerZoom({
      maskLayer,
      stage,
      oldZoom,
      newZoom,
      imageNode
    });

    setX(newX);
    setY(newY);
  };

  const onZoom = (value) => {
    const stage = stageRef.current;

    const imageNode = imageRef.current;
    const oldZoom = imageNode.scaleX();

    const { newX, newY } = centerZoom({
      maskLayer,
      stage,
      oldZoom,
      newZoom: value,
      imageNode
    });
    setX(newX);
    setY(newY);
    setZoom(value);
  };

  const rotate = (direction) => {
    const imageNode = imageRef.current;
    // usage
    const attrs = {
      x: imageNode.x(),
      y: imageNode.y(),
      // width: imageNode.width(),
      // height: imageNode.height(),
      // TODO: rotate around the layer or the image
      width: maskLayer.width,
      height: maskLayer.height,
      rotation: imageNode.rotation()
    };

    const newValue = rotateAroundCenter(attrs, direction === "left" ? -10 : 10);

    setX(newValue.x);
    setY(newValue.y);
    setRotation(newValue.rotation);
  };

  return {
    onZoom,
    zoom,
    minZoom,
    handleWheel,
    onDragEnd,
    croppedValue,
    x,
    y,
    imageRef,
    invertedMaskRef,
    stageRef,
    maxZoom,
    zoomStep,
    rotation,
    rotate,
    // if needed
    handleWheelRelativeToPointer
  };
};
