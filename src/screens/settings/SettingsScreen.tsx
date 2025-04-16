import React, { useState } from "react"
import { Linking, StyleSheet, Switch, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"

import { Container, Icons, TextComponent } from "@components"
import { Fonts, Radius, Spacing } from "@constants"
import { useAppDispatch, useTheme } from "@hooks"
import { RootStackParamList, ROUTES } from "@navigations"
import { toggleTheme } from "@store"
import { setLanguageToStorage, setThemeToStorage } from "@storage"
import SelectModal from "@screens/generateContent/SelectModal"

const IconSize = 24
const LANGUAGE_DATA = ['vi', 'en']

const SetttingsScreen = () => {
    const { colors, isDark } = useTheme()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const dispatch = useAppDispatch()
    const { t, i18n } = useTranslation()
    const [language, setLanguage] = useState<string>(i18n.language)
    const [modalVisible, setModalVisible] = useState(false)

    const toggleSwitch = (value: boolean) => {
        const newTheme = value ? 'dark' : 'light'
        dispatch(toggleTheme())
        setThemeToStorage(newTheme)
    }

    const handleLanguageChange = (value: string) => {
        i18n.changeLanguage(value)
        setLanguage(value)
        setLanguageToStorage(value)
    }

    const renderLanguage = () => {
        return (
            <TextComponent text={t(`${language}`)} style={{ opacity: 0.5 }} />
        )
    }

    return (
        <Container style={{ backgroundColor: colors.containerBackground }}>
            {/* Header */}
            <TextComponent text={t("settings")} style={{ textAlign: 'center', ...Fonts.h2 }} upperCase/>

            {/* Content */}
            <View style={[styles.sectionContainer, { backgroundColor: colors.background }]}>
                <TouchableOpacity
                    style={styles.rowItem}
                    onPress={() => navigation.navigate(ROUTES.ACCOUNT_SYNC)}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: '#DF5252' }]}>
                            <Icons.User color={'white'} size={IconSize} />
                        </View>
                        <TextComponent text={t("accSync")} style={Fonts.body3} />
                    </View>

                    <Icons.ArrowRight color={colors.text} size={IconSize} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rowItem}
                    onPress={() => setModalVisible(true)}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
                            <Icons.Language color={'white'} size={IconSize} />
                        </View>
                        <TextComponent text={t("language")} style={Fonts.body3} />
                    </View>

                    {renderLanguage()}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rowItem}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: 'black' }]}>
                            <Icons.Moon color={'white'} size={IconSize} />
                        </View>
                        <TextComponent text={t("darkMode")} style={Fonts.body3} />
                    </View>

                    <Switch
                        value={isDark}
                        onValueChange={toggleSwitch}
                        trackColor={{ false: colors.surface, true: colors.primaryLight }}
                        thumbColor={isDark ? colors.primary : colors.background}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.rowItem, { marginBottom: undefined }]}
                    onPress={() => navigation.navigate(ROUTES.ABOUT)}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: '#613DE0' }]}>
                            <Icons.Info color={'white'} size={IconSize} />
                        </View>
                        <TextComponent text={t("about")} style={Fonts.body3} />
                    </View>

                    <Icons.ArrowRight color={colors.text} size={IconSize} />
                </TouchableOpacity>
            </View>

            <View style={[styles.sectionContainer, { backgroundColor: colors.background }]}>
                <TouchableOpacity
                    style={styles.rowItem}
                    onPress={() => Linking.openURL("mailto:thanh.ph2021@gmail.com")}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: '#475CB2' }]}>
                            <Icons.SMSEdit color={'white'} size={IconSize} />
                        </View>
                        <TextComponent text={t("sendFeed")} style={Fonts.body3} />
                    </View>

                    <Icons.ArrowRight color={colors.text} size={IconSize} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.rowItem, { marginBottom: undefined }]}
                    onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.aicaption")}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: '#DFA452' }]}>
                            <Icons.Star color={'white'} size={IconSize} />
                        </View>
                        <TextComponent text={t("rateApp")} style={Fonts.body3} />
                    </View>

                    <Icons.ArrowRight color={colors.text} size={IconSize} />
                </TouchableOpacity>
            </View>
            <SelectModal
                visible={modalVisible}
                title={t('language')}
                options={LANGUAGE_DATA}
                selectedValue={language}
                onSelect={handleLanguageChange}
                onClose={() => {
                    setModalVisible(false)
                }}
            />
        </Container>
    )
}

export default SetttingsScreen

const styles = StyleSheet.create({
    sectionContainer: {
        justifyContent: 'center',
        marginHorizontal: Spacing.l,
        padding: Spacing.l,
        marginTop: Spacing.l,
        borderRadius: Radius.l,
        elevation: 6,
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Radius.l,
        justifyContent: 'space-between',
        marginBottom: Spacing.m,
    },
    rowLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.m,
    },
    iconContainer: {
        padding: Spacing.s,
        borderRadius: Radius.l,
    },
})