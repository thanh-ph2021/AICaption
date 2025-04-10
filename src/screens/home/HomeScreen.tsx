import React, { useEffect } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { GoogleGenAI } from "@google/genai"
import Config from 'react-native-config'
import moment from 'moment'

import { useTheme } from '@hooks'
import { Container, TextComponent, Icons } from "@components"
import { Fonts, Spacing, Radius } from '@constants'

const ai = new GoogleGenAI({ apiKey: Config.GOOGLE_API_KEY })
const DATA: any[] = []

const HomeScreen = () => {

    const [content, setContent] = React.useState<string>("")
    const { colors } = useTheme()

    useEffect(() => {
        // const generateContent = async () => {
        //     try {
        //         const response = await ai.models.generateContent({
        //             model: "gemini-2.0-flash",
        //             contents: "Explain how AI works",
        //             config: {
        //                 candidateCount: 2,
        //             }
        //         })
        //         setContent(response.text || "No response")
        //     } catch (error) {
        //         console.error("Error generating content: ", error)
        //         setContent("Error occurred while generating content.")
        //     }
        // }

        // generateContent()
    }, [])

    const renderItem = ({ item }: { item: { id: number, content: string, date: Date, img: string } }) => {
        return (
            <TouchableOpacity
                style={[
                    { backgroundColor: colors.containerBackground, padding: 10, borderRadius: Radius.m },
                    item.img ? { flexDirection: "row", alignItems: "center", gap: Spacing.s } : {}
                ]}>
                {item.img ? <Image source={{ uri: item.img }} style={{ width: 80, height: 80, borderRadius: Radius.circle }} /> : null}
                <View style={{ flexShrink: 1 }}>
                    <TextComponent text={item.content} style={{ ...Fonts.body4, }} />
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: Spacing.s, gap: Spacing.s }}>
                        <Icons.Clock color={colors.text} size={20} />
                        <TextComponent text={moment(item.date).startOf('hour').fromNow()} style={{ ...Fonts.body4 }} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TextComponent text="AI Caption" style={{ ...Fonts.h2 }} />
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: Spacing.m, gap: Spacing.m }}
                    style={{ width: "100%" }}
                />
            </View>
        </Container>
    )
}

export default HomeScreen