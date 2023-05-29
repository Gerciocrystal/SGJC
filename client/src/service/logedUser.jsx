export const getLoggedUser = (token) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  };
  return config;
};
export const getConfig = () => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return config;
};
