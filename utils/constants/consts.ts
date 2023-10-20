export const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? "https://www.cluelesswords.com"
    : "localhost:3000";

export const SOCIAL_IMG_URL_DEFAULT =
  BASE_URL + "/favicon/android-chrome-512x512.png";

export const share_red_box = "🟥";
export const share_green_box = "🟩";
export const share_green_win_box = "✅";
export const share_lock_pen = "🔏";
