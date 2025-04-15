import { GoogleGenAI } from "@google/genai"
import Config from "react-native-config"
import RNFS from 'react-native-fs'

const ai = new GoogleGenAI({ apiKey: Config.GOOGLE_API_KEY })

const uriToBase64 = async (uri: string): Promise<string | null> => {
    try {
        const base64 = await RNFS.readFile(uri, 'base64')
        return base64
    } catch (err) {
        console.error('Failed to read image as base64', err)
        return null
    }
}

const getMimeTypeFromUri = (uri: string): string => {
    const extension = uri.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg'
        case 'png':
            return 'image/png'
        case 'webp':
            return 'image/webp'
        case 'gif':
            return 'image/gif'
        default:
            return 'application/octet-stream'
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
}): Promise<{ text: string, img: string }> => {
    try {
        const imageBase64 = imageUri ? await uriToBase64(imageUri) : null
        const mineType = imageUri ? getMimeTypeFromUri(imageUri) : null

        let fullPrompt = ''

        if (type == 'Status') {
            fullPrompt += `Create a ${style} status in ${language} for ${social}. Mood: "${mood}". Additional context: "${prompt}". ${imageBase64 ? "Analyze the image content and include relevant descriptions in the status." : ""} Make the result engaging and suitable for a social media post. Provide only the status as the result. Not optional.`
        } else if (type == 'Bio') {
            fullPrompt += `Create a ${style} bio in ${language} for ${social}.${topic ? `Focus on the topic: "${topic}".` : ""} Desired length: ${length}.${includeEmoji ? "Include emojis where appropriate." : "Do not include emojis."} Additional context: "${prompt}". Make sure the bio fits well for a profile description on ${social}.Provide only the bio as the result. Not optional.`
        }

        const result = await ai.models.generateContent({
            model,
            contents: [{
                parts: [
                    {
                        text: fullPrompt
                    },
                    ...(imageBase64 ? [{
                        inlineData: {
                            mimeType: mineType!,
                            data: imageBase64,
                        }
                    }] : [])
                ]
            }],
            config: {
                candidateCount
            }
        })

        return {
            text: result.text?.trim() || "",
            img: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : ''
        }
    } catch (error) {
        console.error("Error generating content: ", error)
        return {
            text: "Error occurred while generating content.",
            img: ''
        }
    }
}