export const getIsAdmin = async () => {
  return process.env.NODE_ENV !== "production";
};
