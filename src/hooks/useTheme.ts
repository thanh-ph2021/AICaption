import { selectTheme } from "@store/themeSlice"

import { useAppSelector } from "./redux"

export const useTheme = () => {
    return useAppSelector(selectTheme)
}