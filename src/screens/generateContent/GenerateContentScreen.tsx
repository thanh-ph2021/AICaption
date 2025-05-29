import React, { useState } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"

import { Container, Icons, TextComponent } from "@components"
import { getOptionsByType, getTitleByType, Languages, Length, showNotification, Topics, UtilStyles, WritingStyles } from "@utils"
import { Fonts, Spacing } from "@constants"
import { useAppDispatch, useTheme } from "@hooks"
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
import { addGeneratedItem } from "@store"

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
    const { t } = useTranslation()
    const navigation = useNavigation<NavigationProp>()
    const route = useRoute<RouteProp<RootStackParamList, 'GENERATE_CONTENT'>>()
    const { type } = route.params
    const dispatch = useAppDispatch()

    const [imageUri, setImageUri] = useState<string>("")
    const [prompt, setPrompt] = useState<string>("")

    const [mood, setMood] = useState<string>(moods[0].label)
    const [social, setSocial] = useState<string>(socials[0])

    const [selectedOptionType, setSelectedOptionType] = useState<'style' | 'topic' | 'language' | 'length' | null>(null)
    const [writingStyle, setWritingStyle] = useState<string>(WritingStyles[0])
    const [language, setLanguage] = useState<string>(Languages[0])
    const [topic, setTopic] = useState<string>(Topics[0])
    const [length, setLength] = useState<string>(Length[0])

    const [loading, setLoading] = useState<boolean>(false)
    const [includeEmoji, setIncludeEmoji] = useState<boolean>(true)
    const [modalVisible, setModalVisible] = useState(false)


    const handleGenerate = async () => {
        setLoading(true)

        try {
            const object = {
                type,
                prompt,
                mood,
                social,
                style: t(`${writingStyle}`).toLowerCase(),
                topic: t(`${topic}`),
                language: t(`${language}`),
                length: t(`${length}`),
                includeEmoji,
                imageUri
            }

            const content = await generate(object)

            navigation.navigate(ROUTES.STATUS_BIO_DETAIL, {
                content: content.text,
                socialType: social,
                img: content.img,
                title: 'result',
            })

            dispatch(addGeneratedItem({
                content: content.text,
                socialType: social,
                img: content.img,
            }))

        } catch (error) {
            console.error(error)
            showNotification("Something went wrong while generating the content.", () => <Icons.Danger size={20} />)
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
                        label={t('writeStyle')}
                        selectedValue={writingStyle}
                        onPress={() => {
                            setSelectedOptionType('style')
                            setModalVisible(true)
                        }}
                    />
                    <OptionSelector
                        label={t('language')}
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

                    <PromptInput
                        value={prompt}
                        onChangeText={setPrompt}
                    />
                </View>
            )
        }

        return (
            <View style={{ marginHorizontal: Spacing.l }}>
                <OptionSelector
                    label={t('writeStyle')}
                    selectedValue={writingStyle}
                    onPress={() => {
                        setSelectedOptionType('style')
                        setModalVisible(true)
                    }}
                />
                <OptionSelector
                    label={t('topic')}
                    selectedValue={topic}
                    onPress={() => {
                        setSelectedOptionType('topic')
                        setModalVisible(true)
                    }}
                />
                <OptionSelector
                    label={t('language')}
                    selectedValue={language}
                    onPress={() => {
                        setSelectedOptionType('language')
                        setModalVisible(true)
                    }}
                />
                <OptionSelector
                    label={t('length')}
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
                <PromptInput
                    value={prompt}
                    onChangeText={setPrompt}
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
                <TextComponent text={`${type}`} style={Fonts.h2} upperCase />
                <View style={UtilStyles.headerSpacer} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {/* Content */}
                {renderContent()}
                <View style={{ height: 80 }} />
            </ScrollView>
            
            <GenerateButton
                onPress={handleGenerate}
                isLoading={loading}
                title="generate"
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