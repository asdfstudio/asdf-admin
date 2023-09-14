// const baseUrl = "http://localhost:5000/";
const baseUrl = "https://backend.airlystudio.com/";

export const API = `${baseUrl}api/`;
export const BASE_IMAGE_URL = `${baseUrl}api/portfolio/images/`;

//for deploy storage
// export const generatePublicUrl = (fileName) => {
//   return `${baseUrl}/public/${fileName}`;
// };

//For cloud storage
export const generatePublicUrl = (fileName) => {
  return `${fileName}`;
};
