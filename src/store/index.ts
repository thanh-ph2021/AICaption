import { configureStore } from '@reduxjs/toolkit'

import themeReducer, { toggleTheme, setTheme } from './themeSlice'
import generateReducer, {
  addGeneratedItem,
  setGeneratedList,
  generatedList
} from './generateSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    generate: generateReducer,
  },
})

export {
  addGeneratedItem,
  setGeneratedList,
  generatedList,
  toggleTheme,
  setTheme
}

export * from './type'