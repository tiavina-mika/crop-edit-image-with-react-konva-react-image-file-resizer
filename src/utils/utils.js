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
