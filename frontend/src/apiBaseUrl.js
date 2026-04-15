const fallbackApiUrl = "https://demo-4-zdic.onrender.com";

export const apiBaseUrl = (process.env.REACT_APP_API_URL || fallbackApiUrl).replace(/\/$/, "");
