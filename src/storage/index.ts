import { MMKV } from "react-native-mmkv"

export const storage = new MMKV()

export * from './themeStorage'
export * from './generateStorage'
export * from './languageStorage'