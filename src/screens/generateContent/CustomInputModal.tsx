import React, { useState } from 'react'
import {
    Modal,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { useTranslation } from 'react-i18next'

import { TextComponent } from '@components'
import { Fonts, Radius, Spacing } from '@constants'
import { useTheme } from '@hooks'

interface CustomInputModalProps {
    visible: boolean
    onClose: () => void
    onSubmit: (value: string) => void
}

const CustomInputModal: React.FC<CustomInputModalProps> = ({
    visible,
    onClose,
    onSubmit
}) => {
    const { colors } = useTheme()
    const { t } = useTranslation()
    const [input, setInput] = useState('')

    const handleSubmit = () => {
        if (input.trim()) {
            onSubmit(input.trim())
            setInput('')
        }
        onClose()
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.centeredView}
                >
                    <View style={[styles.modalView, { backgroundColor: colors.containerBackground }]}>

                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            placeholder={t('typeHere')}
                            placeholderTextColor={colors.placehodler}
                            style={[
                                styles.input,
                                {
                                    backgroundColor: colors.background,
                                    color: colors.text,
                                },
                            ]}
                        />

                        <View style={{marginVertical: Spacing.m, alignItems: 'center', backgroundColor: colors.primary, padding: Spacing.s, borderRadius: Radius.m}}>
                            <TouchableOpacity onPress={handleSubmit}>
                                <TextComponent
                                    text={t('confirm')}
                                    style={[Fonts.h3, { color: colors.background }]}
                                    upperCase
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    )
}

export default CustomInputModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    modalView: {
        width: '90%',
        borderRadius: Radius.l,
        padding: Spacing.l,
    },
    input: {
        marginTop: Spacing.m,
        paddingHorizontal: Spacing.m,
        paddingVertical: Spacing.m,
        borderRadius: Radius.m,
        ...Fonts.body3,
    },
})
