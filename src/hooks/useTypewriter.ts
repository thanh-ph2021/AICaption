import { useEffect, useState } from "react"
import GraphemeSplitter from "grapheme-splitter"

export const useTypewriter = (text: string, speed = 50) => {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    const splitter = new GraphemeSplitter()
    const characters = splitter.splitGraphemes(text)

    let i = 0
    let currentText = ""

    setDisplayedText("")

    const interval = setInterval(() => {
      if (i < characters.length) {
        currentText += characters[i]
        setDisplayedText(currentText)
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return displayedText
}
