// const baseUrl = "https://";
const baseUrl = "http://localhost:5000";

export const api = `${baseUrl}/api`;

//for deploy storage
// export const generatePublicUrl = (fileName) => {
//   return `${baseUrl}/public/${fileName}`;
// };

//For cloud storage
export const generatePublicUrl = (fileName) => {
  return `${fileName}`;
};
