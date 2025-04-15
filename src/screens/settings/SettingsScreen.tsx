import React from "react"
import { Linking, StyleSheet, Switch, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { Container, Icons, TextComponent } from "@components"
import { Fonts, Radius, Spacing } from "@constants"
import { UtilStyles } from "@utils"
import { useAppDispatch, useTheme } from "@hooks"
import { RootStackParamList } from "@navigations"
import { toggleTheme } from "@store"
import { setThemeToStorage } from "@storage"

const IconSize = 24

const SetttingsScreen = () => {
    const { colors, isDark } = useTheme()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const dispatch = useAppDispatch()

    const toggleSwitch = (value: boolean) => {
        const newTheme = value ? 'dark' : 'light'
        dispatch(toggleTheme())
        setThemeToStorage(newTheme)
    }

    const renderLanguage = () => {
        return (
            <TextComponent text={'Tiếng việt'} style={{ opacity: 0.5 }} />
        )
    }

    return (
        <Container style={{ backgroundColor: colors.containerBackground }}>
            {/* Header */}
            <View style={UtilStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons.Back size={30} color={colors.text} />
                </TouchableOpacity>
                <TextComponent text={"Settings"} style={Fonts.h2} />
                <View style={UtilStyles.headerSpacer} />
            </View>

            {/* Content */}
            <View style={[styles.sectionContainer, { backgroundColor: colors.background }]}>
                <TouchableOpacity
                    style={styles.rowItem}
                    onPress={() => { }}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: '#DF5252' }]}>
                            <Icons.User color={'white'} size={IconSize} />
                        </View>
                        <TextComponent text={"Accounts and Sync"} style={Fonts.body3} />
                    </View>

                    <Icons.ArrowRight color={colors.text} size={IconSize} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rowItem}
                    onPress={() => { }}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
                            <Icons.Language color={'white'} size={IconSize} />
                        </View>
                        <TextComponent text={"Language"} style={Fonts.body3} />
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
                        <TextComponent text={"Dark mode"} style={Fonts.body3} />
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
                    onPress={() => { }}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: '#613DE0' }]}>
                            <Icons.Info color={'white'} size={IconSize} />
                        </View>
                        <TextComponent text={"About"} style={Fonts.body3} />
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
                        <TextComponent text={"Send Feedback"} style={Fonts.body3} />
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
                        <TextComponent text={"Rate the app"} style={Fonts.body3} />
                    </View>

                    <Icons.ArrowRight color={colors.text} size={IconSize} />
                </TouchableOpacity>
            </View>
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