import React, { useState } from "react"
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"

import { Container, Icons, TextComponent } from "@components"
import { Fonts, Radius, Spacing } from "@constants"
import { useTheme } from "@hooks"
import { UtilStyles } from "@utils"
import { RootStackParamList } from "@navigations"
import { Images } from "@assets"
import DonateAdButton from "./DonateAdButton"

const DonateScreen = () => {
    const { colors } = useTheme()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const { t } = useTranslation()
    const [visible, setVisible] = useState<boolean>(false)
    const [selectedMethod, setSelectedMethod] = useState<'momo' | 'vcb' | null>(null)

    const handlePressDonate = (method: 'momo' | 'vcb') => {
        setSelectedMethod(method)
        setVisible(true)
    }

    return (
        <Container style={{ backgroundColor: colors.background }}>
            {/* Header */}
            <View style={UtilStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons.Back size={30} color={colors.text} />
                </TouchableOpacity>
                <TextComponent text={t('Donate')} style={Fonts.h2} upperCase />
                <View style={UtilStyles.headerSpacer} />
            </View>

            <View style={{ margin: Spacing.l, gap: Spacing.l }}>
                <TextComponent text={t('donateSupport')} style={Fonts.body3} textAlign="center" />
                <TextComponent text={t('thankYou')} style={Fonts.body3} textAlign="center" />
            </View>
            <View style={[styles.sectionContainer, { backgroundColor: colors.background }]}>
                <TouchableOpacity
                    style={styles.rowItem}
                    onPress={() => handlePressDonate('momo')}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer,]}>
                            <Icons.Momo size={24} />
                        </View>
                        <TextComponent text={t("Momo")} style={Fonts.body3} />
                    </View>
                    <Icons.ArrowRight color={colors.text} size={24} />
                </TouchableOpacity>
            </View>
            <View style={[styles.sectionContainer, { backgroundColor: colors.background }]}>
                <TouchableOpacity
                    style={styles.rowItem}
                    onPress={() => handlePressDonate('vcb')}
                >
                    <View style={styles.rowLeftContainer}>
                        <View style={[styles.iconContainer,]}>
                            <Image source={Images.vietcombank} style={{ width: 24, height: 24 }} />
                        </View>
                        <TextComponent text={t("Vietcombank")} style={Fonts.body3} />
                    </View>
                    <Icons.ArrowRight color={colors.text} size={24} />
                </TouchableOpacity>
            </View>
            <DonateAdButton />
            <Modal visible={visible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                        <TextComponent
                            text={selectedMethod === 'momo' ? 'scanMomo' : 'scanVietcombank'}
                            style={Fonts.h4}
                            textAlign="center"
                        />
                        <Image
                            source={
                                selectedMethod === 'momo'
                                    ? Images.momoQR
                                    : Images.vietcombankQR
                            }
                            style={{ width: 200, height: 200, marginVertical: Spacing.m }}
                            resizeMode="contain"
                        />
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <TextComponent text={'close'} style={Fonts.body3} textAlign="center" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Container>
    )
}

export default DonateScreen

const styles = StyleSheet.create({
    sectionContainer: {
        justifyContent: 'center',
        marginHorizontal: Spacing.l,
        padding: Spacing.m,
        marginTop: Spacing.l,
        borderRadius: Radius.l,
        elevation: 6,
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Radius.l,
        justifyContent: 'space-between',
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: Spacing.l,
        borderRadius: Radius.m,
        alignItems: 'center',
    }
})