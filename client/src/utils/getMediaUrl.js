const SERVER_URL =
  import.meta.env.VITE_SERVER_URL ||
  "http://localhost:5000";

const getMediaUrl = (path = "") => {
  if (!path) {
    return "";
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("blob:") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  return `${SERVER_URL}${
    path.startsWith("/")
      ? path
      : `/${path}`
  }`;
};

export default getMediaUrl;