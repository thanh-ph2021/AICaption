import React from "react"
import { Image, Linking, StyleSheet, TouchableOpacity, View } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

import { UtilStyles } from "@utils"
import { Container, Icons, TextComponent } from "@components"
import { Fonts, Radius, Spacing } from "@constants"
import { useTheme } from "@hooks"
import { RootStackParamList } from "@navigations"
import { Images } from "@assets"
import { version } from '../../../package.json'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ABOUT'>
const data = ['privacyPolicy', 'temsService', 'checkUpdate']

const AboutScreen = () => {
    const { colors } = useTheme()
    const { t } = useTranslation()
    const navigation = useNavigation<NavigationProp>()

    return (
        <Container>
            <View style={UtilStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons.Back size={30} color={colors.text} />
                </TouchableOpacity>
                <TextComponent text={t('about')} style={Fonts.h2} upperCase/>
                <View style={UtilStyles.headerSpacer} />
            </View>

            <View>
                <View style={{ alignItems: 'center', gap: Spacing.m, marginTop: Spacing.m*5 }}>
                    <Image source={Images.logo} style={{ width: 80, height: 80 }} />
                    <TextComponent text={`${t('version')} ${version}`} />
                </View>

                <View style={{ marginTop: Spacing.m*5 }}>
                    {data.map((item, index) => (
                        <View key={index} style={[styles.itemContainer, { backgroundColor: colors.surface }]}>
                            <TouchableOpacity
                                style={styles.itemContent}
                                onPress={() => {
                                    switch (index) {
                                        case 0:
                                            Linking.openURL("https://thanh-ph2021.github.io/react-website/#/privacy-policy/1")
                                            break
                                        case 1:
                                            Linking.openURL("https://thanh-ph2021.github.io/react-website/#/terms-of-service/1")
                                            break
                                        case 2:
                                            Linking.openURL("https://play.google.com/store/apps/details?id=com.aicaption")
                                            break
                                    }
                                }}
                            >
                                <TextComponent text={item} />
                                <Icons.ArrowRight color={colors.text} size={20} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

            </View>
            <TextComponent
                text={`© ${new Date().getFullYear()} Lter Studio. ${t('allReserved')}`}
                style={{ ...Fonts.body3, position: 'absolute', bottom: Spacing.l, textAlign: 'center', width: '100%' }}
            />
        </Container>
    )
}

export default AboutScreen

const styles = StyleSheet.create({
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.m,
    },
    itemContainer: {
        margin: Spacing.m,
        paddingHorizontal: Spacing.m,
        borderRadius: Radius.l
    }
})