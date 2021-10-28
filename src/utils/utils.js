/**
 * convert image http url, blob url or data url to File
 * @param {string} url
 * @param {string} filename
 * @param {string} mimeType
 */
// https://newbedev.com/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-form
export const convertUrltoFile = async (
  url,
  filename,
  mimeType = "image/jpeg"
) => {
  const file = await fetch(url);
  const buffer = await file.arrayBuffer();
  const newFile = await new File([buffer], filename, { type: mimeType });
  return newFile;
};

// to capitalize only first letter
export const capitalizeFirstLetter = (string) => {
  if (
    !string ||
    typeof string !== "string" ||
    (string && string.trim().length === 0)
  )
    return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};
