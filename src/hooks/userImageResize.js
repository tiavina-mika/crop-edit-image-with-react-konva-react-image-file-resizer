import { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";

import { IMAGE_RESIZE_MARGIN } from "../styles/constants";
import { convertUrltoFile } from "../utils/utils";

/**
 *
 * @param {*} file
 * @param {number} width
 * @param {number} height
 * @param {string} extension "JPEG, PNG, WEBP"
 * @param {string} outputType "base64, file"
 */
export const resizeFile = ({
  file,
  width = 300,
  height = 300,
  extension = "JPEG",
  outputType = "base64"
}) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      extension,
      70,
      0,
      (uri) => {
        resolve(uri);
      },
      outputType
    );
  });
};

export const useImageResize = ({ file, layer, zoom }) => {
  const [drawing, setDrawing] = useState("");
  const [initialSize, setInitialSize] = useState(0);
  const [finalSize, setFinalSize] = useState(0);
  const [initialImage, setInitialImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);

  useEffect(() => {
    const reSize = async () => {
      try {
        if (!file) return;
        const originalFile = await convertUrltoFile(
          file.src,
          "originalImage.jpg"
        );
        let width;
        let height;
        if (file.naturalWidth * zoom >= layer.width) {
          width = file.naturalWidth * IMAGE_RESIZE_MARGIN * zoom;
        }
        if (file.naturalHeight * zoom >= layer.height) {
          height = file.naturalHeight * IMAGE_RESIZE_MARGIN * zoom;
        }

        setInitialImage({
          width: file.naturalWidth,
          height: file.naturalHeight
        });
        setFinalImage({
          width,
          height
        });

        const resizedImage = await resizeFile({
          file: originalFile,
          width,
          height
        });
        const resizedImageFile = await convertUrltoFile(
          resizedImage,
          "finalImage.jpg"
        );

        // console.log('originalFile.size', originalFile.size / 1000000);
        // console.log('resizedImageFile.size', resizedImageFile.size / 1000000);
        // console.log('file.naturalWidth', file.naturalWidth)
        // console.log('file.naturalHeight', file.naturalHeight)
        // console.log('layer.width', layer.width)
        // console.log('layer.height', layer.height)

        setInitialSize(originalFile.size);
        setFinalSize(resizedImageFile.size);

        setDrawing(resizedImage);
      } catch (err) {
        console.log(err);
      }
    };

    reSize();
  }, [file, setDrawing, layer, zoom]);

  return {
    resizedImage: drawing,
    initialSize,
    finalSize,
    initialImage,
    finalImage
  };
};
