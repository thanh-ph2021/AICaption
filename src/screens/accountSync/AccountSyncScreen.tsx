import React, { useEffect, useState } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { GoogleSignin, SignInResponse, User } from "@react-native-google-signin/google-signin"
import moment from "moment"

import { saveDataToFile, showNotification, UtilStyles } from "@utils"
import { Container, Icons, LoadingDialog, TextComponent } from "@components"
import { Fonts, Radius, Spacing } from "@constants"
import { useAppDispatch, useAppSelector, useTheme } from "@hooks"
import { GeneratedItem, generatedList, setGeneratedList } from "@store"
import { getLastSyncTime, getUserData, removeLastSyncTime, removeUserData, saveLastSyncTime, saveUserData } from "@storage"
import { GoogleDrive } from "@apis"
import { BackupDataModel, NavigationProp } from "./type"

const AccountSyncScreen = () => {
    const { colors } = useTheme()
    const { t } = useTranslation()
    const navigation = useNavigation<NavigationProp>()
    const [userData, setUserData] = useState<User>()
    const dispatch = useAppDispatch()
    const [lastSyncTime, setLastSyncTime] = useState<string>()
    const [dialog, setDialog] = useState<{visible: boolean, description: string}>({visible: false, description: ''})
    const generateDatas: GeneratedItem[] = useAppSelector(generatedList)

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserData()
            setUserData(user)
            const time = await getLastSyncTime()
            time && setLastSyncTime(time)
        }
        fetchData()
    }, [])

    const handleLogin = async () => {
        if (userData) {
            await GoogleSignin.signOut()
            setUserData(undefined)
            setLastSyncTime(undefined)
            removeLastSyncTime()
            removeUserData()
        } else {
            await signIn()
        }
    }

    const updateLastSyncTime = async (date: string) => {
        await saveLastSyncTime(date)
        setLastSyncTime(date)
    }

    const handleAsyncData = async () => {
        setDialog({visible: true, description: 'backingUpData'})
        const date = new Date().toISOString()
        const filePath = await saveDataToFile({ generateDatas, lastSyncTime: date })
        const token = await GoogleSignin.getTokens()
        if (filePath && token) {
            await GoogleDrive.uploadToDrive(token.accessToken, filePath)
            updateLastSyncTime(date)
        }
        showNotification(t('dataBackupSuccessful'), () => <Icons.Success size={30} />)
        setDialog({visible: false, description: ''})
    }

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const response: SignInResponse = await GoogleSignin.signIn()
            const userInfo = response.data!
            setUserData(userInfo)
            saveUserData(JSON.stringify(userInfo))

            const token = await GoogleSignin.getTokens()
            if (token) {
                setDialog({visible: true, description: 'loadingData'})
                const fieldId = await GoogleDrive.getFileId(token.accessToken)
                if (fieldId) {
                    const data: BackupDataModel = await GoogleDrive.downloadFile(token.accessToken, fieldId)
                    updateLastSyncTime(data.lastSyncTime)
                    await dispatch(setGeneratedList(data.generateDatas))
                }
            }
            setDialog({visible: false, description: ''})
        } catch (error) {
            console.error(JSON.stringify(error))
        }
    }

    return (
        <Container>
            {/* Header */}
            <View style={UtilStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons.Back size={30} color={colors.text} />
                </TouchableOpacity>
                <TextComponent text={t('accSync')} style={Fonts.h2} upperCase />
                <View style={UtilStyles.headerSpacer} />
            </View>
            {/* Content */}
            <View style={[styles.itemContainer, { backgroundColor: colors.surface, marginTop: Spacing.l }]}>
                <TouchableOpacity
                    style={styles.itemContent}
                    onPress={handleLogin}
                >
                    {userData ? (
                        <>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.m }}>

                                <Image source={{ uri: userData.user.photo! }} style={{ width: 30, height: 30, borderRadius: 30 / 2 }} />
                                <View>
                                    <TextComponent text={userData.user.name!} />
                                    <TextComponent text={userData.user.email!} style={{ ...Fonts.body5, color: colors.textSecondary }} />
                                </View>
                            </View>
                            <TextComponent text={t('logout')} style={{ ...Fonts.body4, color: colors.primary, fontWeight: 'bold' }} />
                        </>

                    ) : (
                        <>
                            <TextComponent text='Google Drive' />
                            <Icons.ArrowRight color={colors.text} size={24}/>
                        </>
                    )}

                </TouchableOpacity>
            </View>
            <View style={[styles.itemContainer, { backgroundColor: colors.surface }]}>
                <TouchableOpacity
                    disabled={!userData}
                    style={[styles.itemContent, { opacity: userData ? 1 : 0.5 }]}
                    onPress={handleAsyncData}
                >
                    <View>
                        <TextComponent text={t('backupRecord')} />
                        {lastSyncTime && <TextComponent text={moment(lastSyncTime).format('DD/MM/YYYY HH:mm:ss')} style={{ ...Fonts.h3, fontWeight: 'bold' }} />}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.m }}>
                        <TextComponent text={t('backup')} style={{ ...Fonts.body4, opacity: .8 }} />
                        <Icons.ArrowRight color={colors.text} size={24}/>
                    </View>

                </TouchableOpacity>
            </View>
            <LoadingDialog
                visible={dialog.visible}
                description={dialog.description}
            />
        </Container>
    )
}

export default AccountSyncScreen

const styles = StyleSheet.create({
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.m,
    },
    itemContainer: {
        marginHorizontal: Spacing.m,
        marginVertical: Spacing.m,
        padding: Spacing.m,
        borderRadius: Radius.l
    }
})