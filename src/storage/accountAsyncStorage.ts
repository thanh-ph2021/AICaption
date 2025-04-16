import { storage } from "./index"
import { STORAGE_KEYS } from "./mmkvKeys"

export const saveLastSyncTime = async (date: string) => {
    storage.set(STORAGE_KEYS.LAST_SYNC_TIME, date)
}

export const getLastSyncTime = async () => {
    return storage.getString(STORAGE_KEYS.LAST_SYNC_TIME)
}

export const removeLastSyncTime = async () => {
    return storage.delete(STORAGE_KEYS.LAST_SYNC_TIME)
}