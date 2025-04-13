import React from "react"
import { Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Clipboard from "@react-native-clipboard/clipboard"
import Share from "react-native-share"

import { Container, Icons, TextComponent } from "@components"
import { Fonts, Radius, Sizes, Spacing } from "@constants"
import { useTheme } from "@hooks"
import { RootStackParamList } from "@navigations"
import { showNotification, UtilStyles, getIcon } from "@utils"

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'STATUS_BIO_DETAIL'>

const StatusBioDetailScreen = () => {

    const { colors } = useTheme()
    const navigation = useNavigation<NavigationProp>()
    const route = useRoute<RouteProp<RootStackParamList, 'STATUS_BIO_DETAIL'>>()
    const { content, socialType, img } = route.params

    const copyToClipboard = () => {
        showNotification("Copied successfully!", () => <Icons.Success size={30} />)
        Clipboard.setString(content)
    }

    const shareContent = () => {
        const options = Platform.select({
            default: {
                message: content,
                url: img,
            },
        })
        Share.open(options)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                err && console.log(err)
            })
    }

    return (
        <Container>
            {/* Header */}
            <View style={UtilStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons.Back size={30} color={colors.text} />
                </TouchableOpacity>
                <TextComponent text="Detail" style={Fonts.h2} />
                <View style={UtilStyles.headerSpacer} />
            </View>

            {/* Content */}
            <View style={styles.body}>
                {img ? <Image source={{ uri: img }} style={[styles.image, { width: Sizes.width - (Spacing.l * 2), height: Sizes.height * 0.6 }]} /> : null}
                <View style={[styles.textBox, { backgroundColor: colors.containerBackground }]}>
                    {getIcon(socialType)}
                    <TextComponent text={content} style={[Fonts.body3, styles.contentText]} showFullLine />
                </View>
                <View style={styles.actionRow}>
                    <TouchableOpacity onPress={copyToClipboard}>
                        <TextComponent text={'COPY'} style={Fonts.h3} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={shareContent}>
                        <TextComponent text={'SHARE'} style={Fonts.h3} />
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    )
}

export default StatusBioDetailScreen

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        marginTop: Spacing.l,
        marginHorizontal: Spacing.l,
        gap: Spacing.l
    },
    image: {
        borderRadius: Radius.l
    },
    textBox: {
        flexDirection: 'row',
        width: '100%',
        padding: Spacing.m,
        borderRadius: Radius.l,
        alignItems: 'center',
        gap: Spacing.m
    },
    contentText: {
        flexShrink: 1
    },
    actionRow: {
        flexDirection: 'row',
        gap: Spacing.xxl,
        alignSelf: 'flex-end'
    }
})