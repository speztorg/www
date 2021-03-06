const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

const getBaseUrl = () => {
  if (
    typeof window !== "undefined" &&
    window &&
    window.location &&
    window.location.origin
  ) {
    return window.location.origin;
  }
  return `${protocol}://${process.env.BASE_URL}`;
};

export { getBaseUrl, protocol };
