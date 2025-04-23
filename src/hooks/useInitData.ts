import { useEffect } from 'react'
import { useAppDispatch } from '@hooks'
import { setGeneratedList, setTheme } from '@store'
import { getGeneratedList, getThemeFromStorage } from '@storage'

export const useInitData = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadData = async () => {
      const saved = getGeneratedList()
      if (saved) dispatch(setGeneratedList(saved))

      const theme = await getThemeFromStorage()
      if (theme) {
        dispatch(setTheme(theme))
      }
    }
    loadData()
  }, [])
}
