export const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? "https://www.nonsoo.com"
    : "localhost:3000";

export const SOCIAL_IMG_URL_DEFAULT =
  BASE_URL + "/favicon/android-chrome-512x512.png";
