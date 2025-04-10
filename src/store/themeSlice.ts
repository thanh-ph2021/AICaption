import { createSlice } from "@reduxjs/toolkit"

import { DarkTheme, LightTheme, ThemeModel } from "@theme"
import { RootState } from "./type"

const initialState: ThemeModel = {
    type: 'light',
    themeData: LightTheme
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      toggleTheme: (state) => {
        const newType = state.type === 'light' ? 'dark' : 'light'
        state.type = newType
        state.themeData = newType === 'light' ? LightTheme : DarkTheme
      },
    },
  })
  
  export const { toggleTheme } = themeSlice.actions
  export default themeSlice.reducer

  export const selectTheme = (state: RootState) => state.theme.themeData