import create from "zustand";

function getItem(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key) || "");
  } catch (err) {
    return false;
  }
}

const useDarkMode = create((set) => ({
  isDarkMode: getItem("darkMode"),
  setIsDarkMode: (value) => {
    window.localStorage.setItem("darkMode", value);
    return set({ isDarkMode: value });
  },
}));

export { useDarkMode };
