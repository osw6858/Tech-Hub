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
//조그만한  Slice를 만든는 파일
//그 Slice를 모아서 하나의 큰 Store을 구성함

//https://ko.redux.js.org/tutorials/essentials/part-3-data-flow
