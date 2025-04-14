import { storage } from "./index"
import { STORAGE_KEYS } from "./mmkvKeys"

export const setThemeToStorage = (themeType: 'light' | 'dark') => {
  storage.set(STORAGE_KEYS.THEME, themeType)
}

export const getThemeFromStorage = (): 'light' | 'dark' | null => {
  return storage.getString(STORAGE_KEYS.THEME) as 'light' | 'dark' | null
}