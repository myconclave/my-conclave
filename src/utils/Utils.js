export function dayDiff(date) {
  const currentTS = new Date().getTime();
  const givenTS = new Date(date).getTime();
  const calculateDays = Math.floor(
    (currentTS - givenTS) / (1000 * 60 * 60 * 24)
  );
  return calculateDays === 0
    ? "Today"
    : calculateDays === 1
    ? "Yesterday"
    : `${calculateDays} days ago`;
}

export function tokenConfigUtil(token) {
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
}

export const tokenConfig = (token) => {
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
