import { store } from './index'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface GeneratedItem {
    id: string,
    content: string,
    socialType: string,
    createdAt: string,
    img?: string
}

export interface GenerateState {
    items: GeneratedItem[]
}