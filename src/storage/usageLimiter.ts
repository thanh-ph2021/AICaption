import dayjs from 'dayjs'

import { storage } from "./index"
import { STORAGE_KEYS } from './mmkvKeys'

export const hasUsedImageToday = (): boolean => {
  const date = storage.getString(STORAGE_KEYS.IMAGE_USED_DATE)
  return date === dayjs().format('YYYY-MM-DD')
}

export const setImageUsedToday = () => {
  storage.set(STORAGE_KEYS.IMAGE_USED_DATE, dayjs().format('YYYY-MM-DD'))
}

export const getGenerateCount = (): number => {
  const today = dayjs().format('YYYY-MM-DD')
  const storedDate = storage.getString(STORAGE_KEYS.GENERATE_COUNT)

  if (storedDate !== today) {
    storage.set(STORAGE_KEYS.GENERATE_DATE, today)
    storage.set(STORAGE_KEYS.GENERATE_COUNT, '1')
    return 1
  } else {
    const count = parseInt(storage.getString(STORAGE_KEYS.GENERATE_COUNT) || '0', 10)
    if (count >= 10) return -1
    storage.set(STORAGE_KEYS.GENERATE_COUNT, String(count + 1))
    return count + 1
  }
}
