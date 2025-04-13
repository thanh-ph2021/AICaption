import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

import { Fonts, Radius, Spacing } from '@constants'
import { useTheme } from '@hooks'

interface PromptInputProps {
    value: string
    onChangeText: (text: string) => void
    placeholder?: string
}

const PromptInput: React.FC<PromptInputProps> = ({
    value,
    onChangeText,
    placeholder = "What's on your mind?",
}) => {
    const {colors} = useTheme()

    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.placehodler}
                style={[styles.textInput, { backgroundColor: colors.surface, color: colors.text }]}
                multiline
            />
        </View>
    );
};

export default PromptInput

const styles = StyleSheet.create({
    container: {
        marginTop: Spacing.l,
    },
    textInput: {
        borderRadius: Radius.l,
        padding: 14,
        height: 120,
        textAlignVertical: 'top',
        ...Fonts.body3
    },
})