import { storage } from "./index"
import { STORAGE_KEYS } from "./mmkvKeys"

export const setLanguageToStorage = (language: string) => {
  storage.set(STORAGE_KEYS.LANGUAGE, language)
}

export const getLanguageFromStorage = () => {
  return storage.getString(STORAGE_KEYS.LANGUAGE)
}