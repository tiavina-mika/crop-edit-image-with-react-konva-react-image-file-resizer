import { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { convertUrltoFile } from "../utils/utils";

/**
 *
 * @param {*} file
 * @param {number} width
 * @param {number} height
 * @param {string} extension "JPEG, PNG, WEBP"
 * @param {string} outputType "base64, file"
 */
const resizeFile = ({
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
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      outputType
    );
  });
};

export const useImageResize = ({ file }) => {
  const [drawing, setDrawing] = useState("");
  const [initialSize, setInitialSize] = useState(0);
  const [finalSize, setFinalSize] = useState(0);

  useEffect(() => {
    const reSize = async () => {
      try {
        const originalFile = await convertUrltoFile(
          file.src,
          "originalImage.jpg"
        );
        const resizedImage = await resizeFile({
          file: originalFile
        });
        const resizedImageFile = await convertUrltoFile(
          resizedImage,
          "finalImage.jpg"
        );

        // // console.log(resizedFinalFile);
        setInitialSize(originalFile.size);
        setFinalSize(resizedImageFile.size);

        setDrawing(resizedImage);
      } catch (err) {
        console.log(err);
      }
    };

    reSize();
  }, [file, setDrawing]);

  return {
    resizedImage: drawing,
    initialSize,
    finalSize
  };
};