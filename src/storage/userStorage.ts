import EncryptedStorage from 'react-native-encrypted-storage'

import { STORAGE_KEYS } from './mmkvKeys'

export const saveUserData = async (data: string) => {
     await EncryptedStorage.setItem(STORAGE_KEYS.USER, data)
}

export const getUserData = async () => {
    const userData = await EncryptedStorage.getItem(STORAGE_KEYS.USER)
    if(userData){
        return JSON.parse(userData)
    }
    return userData
}

export const removeUserData = async () => {
    await EncryptedStorage.removeItem(STORAGE_KEYS.USER)
}