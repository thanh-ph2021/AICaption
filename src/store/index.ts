import { configureStore } from '@reduxjs/toolkit'

import themeReducer from './themeSlice'
import generateReducer from './generateSlice'
import reducer, {
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
  reducer,
  addGeneratedItem,
  setGeneratedList,
  generatedList
}

export * from './type'