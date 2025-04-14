
import { storage } from "./index"
import { STORAGE_KEYS } from "./mmkvKeys"
import { GeneratedItem } from '@store'

export const saveGeneratedList = (data: GeneratedItem[]) => {
    storage.set(STORAGE_KEYS.GENERATED_LIST, JSON.stringify(data))
}

export const getGeneratedList = (): GeneratedItem[] => {
    const value = storage.getString(STORAGE_KEYS.GENERATED_LIST)
    if (!value) return []
    try {
        return JSON.parse(value)
    } catch {
        return []
    }
}