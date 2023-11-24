import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  dark: boolean;
}

const isDark = localStorage.getItem("darkMode");

const initialState: ThemeState = {
  dark: isDark === "true",
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDark: (state): void => {
      state.dark = !state.dark;
      localStorage.setItem("darkMode", JSON.stringify(state.dark));
    },
  },
});

export const { setDark } = ThemeSlice.actions;

export default ThemeSlice.reducer;
