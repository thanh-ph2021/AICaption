import React, { useState } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { Container, Icons, TextComponent } from "@components"
import { getOptionsByType, getTitleByType, Languages, Length, Topics, UtilStyles, WritingStyles } from "@utils"
import { Fonts, Spacing } from "@constants"
import { useTheme } from "@hooks"
import { RootStackParamList, ROUTES } from "@navigations"
import PromptInput from "./PromptInput"
import ImageSelector from "./ImageSelector"
import GenerateButton from "./GenerateButton"
import MoodSelector from "./MoodSelector"
import { MoodImages } from "@assets"
import OptionSelector from "./OptionSelector"
import SocialSelector from "./SocialSelector"
import EmojiToggle from "./EmojiToggle"
import SelectModal from "./SelectModal"
import { generate } from "@apis"

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'GENERATE_CONTENT'>
const moods = [
    { label: "cool", image: MoodImages.cool },
    { label: "inlove", image: MoodImages.inlove },
    { label: "sad", image: MoodImages.sad },
    { label: "angry", image: MoodImages.angry },
    { label: "calm", image: MoodImages.calm },
]
const socials = ["Instagram", "Facebook", "Threads", "Youtube", "X", "LinkedIn"]

const GenerateContentScreen = () => {
    const { colors } = useTheme()
    const navigation = useNavigation<NavigationProp>()
    const route = useRoute<RouteProp<RootStackParamList, 'GENERATE_CONTENT'>>()
    const { type } = route.params

    const [imageUri, setImageUri] = useState<string>("")
    const [prompt, setPrompt] = useState<string>("")

    const [mood, setMood] = useState<string>(moods[0].label)
    const [social, setSocial] = useState<string>(socials[0])

    const [selectedOptionType, setSelectedOptionType] = useState<'style' | 'topic' | 'language' | 'length' | null>(null)
    const [writingStyle, setWritingStyle] = useState<string>(WritingStyles[0].label)
    const [language, setLanguage] = useState<string>(Languages[0].label)
    const [topic, setTopic] = useState<string>(Topics[0].label)
    const [length, setLength] = useState<string>(Length[0].label)

    const [loading, setLoading] = useState<boolean>(false)
    const [includeEmoji, setIncludeEmoji] = useState<boolean>(true)
    const [modalVisible, setModalVisible] = useState(false)


    const handleGenerate = async () => {
        setLoading(true)

        try {
            const content = await generate({
                type,
                prompt,
                mood,
                social,
                style: writingStyle.toLowerCase(),
                topic: topic,
                language: language,
                length: length,
                includeEmoji,
                imageUri,
            })
    
            navigation.navigate(ROUTES.STATUS_BIO_DETAIL, {
                content,
                socialType: type,
                img: imageUri
            })
        } catch (error) {
            console.error(error)
            navigation.navigate(ROUTES.STATUS_BIO_DETAIL, {
                content: "Đã xảy ra lỗi khi tạo nội dung.",
                socialType: type,
                img: imageUri
            })
        } finally {
            setLoading(false)
        }
    }

    const onSelect = (value: string) => {
        switch (selectedOptionType) {
            case 'style':
                setWritingStyle(value)
                break
            case 'topic': setTopic(value)
                break
            case 'language':
                setLanguage(value)
                break
            case 'length':
                setLength(value)
                break
        }
    }

    const renderContent = () => {
        if (type === "Status") {
            return (
                <View style={{ marginHorizontal: Spacing.l }}>
                    <PromptInput
                        value={prompt}
                        onChangeText={setPrompt}
                    />
                    <ImageSelector
                        imageUri={imageUri}
                        onImageSelected={(uri) => setImageUri(uri)}
                    />
                    <MoodSelector
                        moods={moods}
                        selectedMood={mood}
                        onSelectMood={(m) => setMood(m)}
                    />

                    <OptionSelector
                        label="Writing style"
                        selectedValue={writingStyle}
                        onPress={() => {
                            setSelectedOptionType('style')
                            setModalVisible(true)
                        }}
                    />
                    <OptionSelector
                        label="Language"
                        selectedValue={language}
                        onPress={() => {
                            setSelectedOptionType('language')
                            setModalVisible(true)
                        }}
                    />
                    <SocialSelector
                        socials={socials}
                        selectedSocial={social}
                        onSelectSocial={(s) => setSocial(s)}
                    />
                </View>
            )
        }

        return (
            <View style={{ marginHorizontal: Spacing.l }}>
                <PromptInput
                    value={prompt}
                    onChangeText={setPrompt}
                />
                <OptionSelector
                    label="Writing style"
                    selectedValue={writingStyle}
                    onPress={() => {
                        setSelectedOptionType('style')
                        setModalVisible(true)
                    }}
                />
                <OptionSelector
                    label="Topic"
                    selectedValue={topic}
                    onPress={() => {
                        setSelectedOptionType('topic')
                        setModalVisible(true)
                    }}
                />
                <OptionSelector
                    label="Language"
                    selectedValue={language}
                    onPress={() => {
                        setSelectedOptionType('language')
                        setModalVisible(true)
                    }}
                />
                <OptionSelector
                    label="Length"
                    selectedValue={length}
                    onPress={() => {
                        setSelectedOptionType('length')
                        setModalVisible(true)
                    }}
                />
                <EmojiToggle
                    value={includeEmoji}
                    onValueChange={setIncludeEmoji}
                />
                <SocialSelector
                    socials={socials}
                    selectedSocial={social}
                    onSelectSocial={(s) => setSocial(s)}
                />
            </View>
        )
    }

    return (
        <Container>
            {/* Header */}
            <View style={UtilStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons.Back size={30} color={colors.text} />
                </TouchableOpacity>
                <TextComponent text={`${type}`} style={Fonts.h2} />
                <View style={UtilStyles.headerSpacer} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {/* Content */}
                {renderContent()}

            </ScrollView>

            <GenerateButton
                onPress={handleGenerate}
                isLoading={loading}
                title="Generate"
            />

            <SelectModal
                visible={modalVisible}
                title={getTitleByType(selectedOptionType)}
                options={getOptionsByType(selectedOptionType)}
                selectedValue={
                    selectedOptionType === 'style' ? writingStyle :
                        selectedOptionType === 'topic' ? topic :
                            selectedOptionType === 'language' ? language :
                                selectedOptionType === 'length' ? length : null
                }
                onSelect={onSelect}
                onClose={() => {
                    setModalVisible(false)
                    setSelectedOptionType(null)
                }}
            />
        </Container>
    )
}

export default GenerateContentScreen