import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import 'react-native-get-random-values'
import { nanoid } from "nanoid"

import { GeneratedItem, GenerateState, RootState } from './type'
import { saveGeneratedList } from '@storage'

const initialState: GenerateState = {
    items: [],
}

const generateSlice = createSlice({
    name: 'generate',
    initialState,
    reducers: {
        addGeneratedItem: (
            state,
            action: PayloadAction<{
                content: string,
                socialType: string,
                img?: string
            }>
        ) => {
            const newItem: GeneratedItem = {
                id: nanoid(),
                createdAt: new Date().toISOString(),
                ...action.payload,
            }
            state.items.unshift(newItem)
            saveGeneratedList(state.items)
        },
        setGeneratedList: (
            state,
            action: PayloadAction<GeneratedItem[]>
        ) => {
            const datas: GeneratedItem[] = [...state.items].concat([...action.payload])
            const uniqueDatas = [...new Map(datas.map(item => [item.id, item])).values()]
            state.items = uniqueDatas
            saveGeneratedList(state.items)
        }
    },
})

export const { addGeneratedItem, setGeneratedList } = generateSlice.actions
export default generateSlice.reducer

export const generatedList = (state: RootState) => state.generate.items
