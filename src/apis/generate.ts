import { GoogleGenAI } from "@google/genai"
import Config from "react-native-config"

const ai = new GoogleGenAI({ apiKey: Config.GOOGLE_API_KEY })

const uriToBase64 = async (uri: string): Promise<string | null> => {
    try {
        //   const base64 = await RNFS.readFile(uri, 'base64')
        //   return base64
        return Promise.resolve(uri)
    } catch (err) {
        console.error('Failed to read image as base64', err)
        return null
    }
}

export const generate = async ({
    type,
    prompt,
    mood,
    social,
    style,
    topic,
    language,
    length,
    includeEmoji,
    imageUri,
    model = "gemini-1.5-flash",
    candidateCount = 1
}: {
    type: string,
    prompt: string,
    mood?: string,
    social?: string,
    style?: string,
    topic?: string,
    language?: string,
    length?: string,
    includeEmoji?: boolean,
    imageUri?: string,
    model?: string,
    candidateCount?: number
}): Promise<string> => {
    try {
        // const imageBase64 = imageUri ? await uriToBase64(imageUri) : null

        const fullPrompt = `Write a ${style} ${type} ${
            topic ? `about the topic "${topic}"` : ""
          } in ${language} language, with ${length} length, for ${social}, ${
            includeEmoji ? "include" : "exclude"
          } emojis, with the mood "${mood}". Additional content: ${prompt}`

        const result = await ai.models.generateContent({
            model,
            contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
            config: {
                candidateCount
            }
        })

        const content = result.text
        return content || "No content generated"
    } catch (error) {
        console.error("Error generating content: ", error)
        return "Error occurred while generating content."
    }
}