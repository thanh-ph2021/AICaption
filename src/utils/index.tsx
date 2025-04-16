import { StyleSheet, View } from "react-native"
import { Notifier } from "react-native-notifier"
import RNFS from 'react-native-fs'
import { GoogleSignin } from "@react-native-google-signin/google-signin"

import { Fonts, Spacing } from "@constants"
import { Icons, TextComponent } from "@components"
import { BackupDataModel } from "@screens/accountSync"
import { GoogleDrive } from "@apis"
import { saveLastSyncTime } from "@storage"

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
      return <Icons.Instagram size={size ? size : 30} />
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

export const WritingStyles = ['formal', 'informal', 'funny', 'romantic', 'motivational', 'sarcastic', 'poetic', 'aesthetic', 'minimalist', 'emotional']

export const Languages = ['vi', 'en', 'zh', 'hi', 'es', 'fr', 'ar', 'bn', 'ru', 'pt', 'ur']

export const Topics = ['love','life','friendship','success','travel','food','self_love','fitness','nature','sadness']

export const Length = ['short','medium','long','very_long']

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
      return 'writeStyle'
    case 'topic':
      return 'topic'
    case 'language':
      return 'language'
    case 'length':
      return 'length'
    default:
      return ''
  }
}

export { default as UtilStyles } from "./UtilStyles"

export const saveDataToFile = async (data: BackupDataModel) => {
  const path = `${RNFS.DocumentDirectoryPath}/ai-caption-data.json`
  const jsonData = JSON.stringify(data, null, 2)

  try {
      await RNFS.writeFile(path, jsonData, "utf8")
      console.log("File saved at:", path)
      return path
  } catch (error) {
      console.error("Error saving file:", error)
  }
}

export const handleAsyncData = async (data: BackupDataModel) => {
  const date = new Date().toISOString()
  const filePath = await saveDataToFile(data)
  const token = await GoogleSignin.getTokens()
  if (filePath && token) {
      await GoogleDrive.uploadToDrive(token.accessToken, filePath)
      await saveLastSyncTime(date)
  }
}

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