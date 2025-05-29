import React from 'react'
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native'

import { TextComponent, Icons } from '@components'
import { Fonts, Radius, Spacing } from '@constants'
import { useTheme } from '@hooks'

interface ConfirmModalProps {
    visible: boolean
    onConfirm: () => void
    onCancel: () => void
    title?: string
    message?: string
    confirmText?: string
    cancelText?: string
}

const AppModal: React.FC<ConfirmModalProps> = ({
    visible,
    onConfirm,
    onCancel,
    title,
    message,
    confirmText,
    cancelText,
}) => {
    const { colors } = useTheme()

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, { backgroundColor: colors.containerBackground }]}>
                    <View style={styles.iconContainer}>
                        <Icons.QuestionMark color={colors.accent} size={40} />
                    </View>
                    <TextComponent text={title} style={Fonts.h3} textAlign='center' />
                    <TextComponent
                        text={message}
                        style={[Fonts.body4, { color: colors.textSecondary }]}
                        textAlign='center'
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.outlineButton, { borderColor: colors.textSecondary }]} onPress={onCancel}>
                            <TextComponent text={cancelText} style={[Fonts.body3]} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.fillButton, { backgroundColor: colors.accent }]} onPress={onConfirm}>
                            <TextComponent text={confirmText} style={Fonts.body3} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        borderRadius: Radius.l,
        padding: Spacing.l,
        alignItems: 'center',
        gap: Spacing.m,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconContainer: {
        backgroundColor: '#FDECF1',
        padding: Spacing.m,
        borderRadius: Radius.circle,
        marginBottom: Spacing.s
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap: Spacing.m,
        marginTop: Spacing.m
    },
    outlineButton: {
        flex: 1,
        borderWidth: 1,
        paddingVertical: Spacing.s,
        borderRadius: Radius.m,
        alignItems: 'center'
    },
    fillButton: {
        flex: 1,
        paddingVertical: Spacing.s,
        borderRadius: Radius.m,
        alignItems: 'center'
    }
})


export default AppModal
