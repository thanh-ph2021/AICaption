import { StyleSheet, View } from "react-native"
import { Notifier } from "react-native-notifier"

import { Fonts, Spacing } from "@constants"
import { Icons, TextComponent } from "@components"

export const showNotification = (title: string, Icon: () => React.ReactElement) => {
    Notifier.showNotification({
        duration: 2000,
        title: title,
        Component: (props) => {
            return (
                <View style={styles.container}>
                    <Icon />
                    <TextComponent color="black" text={props.title} style={Fonts.body3} />
                </View>
            )
        }
    })
}

export const getIcon = (socialType: string, size?: number) => {
    switch (socialType) {
        case 'Instagram':
            return <Icons.Instagram size={size ? size : 30}/>
        case 'Facebook':
            return <Icons.Facebook size={size ? size : 30} />
        case 'Threads':
            return <Icons.Threads size={size ? size : 30} />
        case 'Youtube':
            return <Icons.Youtube size={size ? size : 30} />
        case 'X':
            return <Icons.X size={size ? size : 30} />
        case 'LinkedIn':
            return <Icons.LinkedIn size={size ? size : 30} />
    }
}

export const WritingStyles = [
    { label: 'Formal ', value: 'formal' },
    { label: 'Informal ', value: 'informal' },
    { label: 'Funny', value: 'funny' },
    { label: 'Romantic', value: 'romantic' },
    { label: 'Motivational', value: 'motivational' },
    { label: 'Sarcastic', value: 'sarcastic' },
    { label: 'Poetic', value: 'poetic' },
    { label: 'Aesthetic', value: 'aesthetic' },
    { label: 'Minimalist', value: 'minimalist' },
    { label: 'Emotional', value: 'emotional' },
]

export const Languages = [
  { label: 'Tiếng việt', value: 'vi' },
  { label: 'English', value: 'en' },
  { label: '中文', value: 'zh' },
  { label: 'हिन्दी', value: 'hi' },
  { label: 'Español', value: 'es' },
  { label: 'Français', value: 'fr' },
  { label: 'العربية', value: 'ar' },
  { label: 'বাংলা', value: 'bn' },
  { label: 'Русский', value: 'ru' },
  { label: 'Português', value: 'pt' },
  { label: 'اردو', value: 'ur' },
]

export const Topics = [
  { label: 'Love', value: 'love' },
  { label: 'Life', value: 'life' },
  { label: 'Friendship', value: 'friendship' },
  { label: 'Success', value: 'success' },
  { label: 'Travel', value: 'travel' },
  { label: 'Food', value: 'food' },
  { label: 'Self-love', value: 'self_love' },
  { label: 'Fitness', value: 'fitness' },
  { label: 'Nature', value: 'nature' },
  { label: 'Sadness', value: 'sadness' },
]

export const Length = [
  { label: 'Short (1–2 sentences)', value: 'short' },
  { label: 'Medium (3–5 sentences)', value: 'medium' },
  { label: 'Long (5–8 sentences)', value: 'long' },
  { label: 'Very Long (8+ sentences)', value: 'very_long' },
];

export const getOptionsByType = (selectedOptionType: string | null) => {
    switch (selectedOptionType) {
      case 'style':
        return WritingStyles
      case 'topic':
        return Topics
      case 'language':
        return Languages
      case 'length':
        return Length
      default:
        return []
    }
  }
  
export const getTitleByType = (selectedOptionType: string | null) => {
    switch (selectedOptionType) {
      case 'style':
        return 'Writing Style'
      case 'topic':
        return 'Topic'
      case 'language':
        return 'Language'
      case 'length':
        return 'Length'
      default:
        return ''
    }
  }

export {default as UtilStyles} from "./UtilStyles"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: Spacing.s,
        marginHorizontal: Spacing.s,
        marginVertical: Spacing.xxl,
        borderRadius: Spacing.s,
        alignItems: 'center',
        gap: Spacing.s,
        elevation: 6
    },
})