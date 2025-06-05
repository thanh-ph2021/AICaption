import React from 'react'
import { TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { useTranslation } from 'react-i18next'

import { Fonts, Radius } from '@constants'
import { useTheme } from '@hooks'

interface PromptInputProps {
    value: string
    onChangeText: (text: string) => void
    placeholder?: string
    maxLength?: number 
}

const PromptInput: React.FC<PromptInputProps> = ({
    value,
    onChangeText,
    placeholder = "optionalMore",
    maxLength, 
}) => {
    const { colors } = useTheme()
    const { t } = useTranslation()

    return (
        <KeyboardAvoidingView style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={t(`${placeholder}`)}
                placeholderTextColor={colors.placehodler}
                style={[styles.textInput, { backgroundColor: colors.surface, color: colors.text }]}
                multiline
                maxLength={maxLength}
            />
        </KeyboardAvoidingView>
    );
};

export default PromptInput

const styles = StyleSheet.create({
    container: {
        // marginTop: Spacing.l,
    },
    textInput: {
        borderRadius: Radius.l,
        padding: 14,
        height: 120,
        textAlignVertical: 'top',
        ...Fonts.body3
    },
})