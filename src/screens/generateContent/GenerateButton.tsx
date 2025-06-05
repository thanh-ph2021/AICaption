import React from 'react'
import { TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native'
import { useTranslation } from 'react-i18next'

import { useTheme } from '@hooks'
import { TextComponent } from '@components'
import { Fonts, Radius, Spacing } from '@constants'

interface GenerateButtonProps {
    onPress: () => void
    isLoading?: boolean
    title?: string,
    containerStyle?: ViewStyle
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
    onPress,
    isLoading = false,
    title = 'generate',
    containerStyle
}) => {
    const { colors } = useTheme()
    const { t } = useTranslation()

    return (
        <TouchableOpacity
            style={[styles.button, isLoading && styles.disabled, { backgroundColor: colors.primary }, containerStyle]}
            onPress={onPress}
            disabled={isLoading}
            activeOpacity={0.8}
        >
            {isLoading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <TextComponent text={t(`${title}`).toUpperCase()} style={Fonts.h3} color='white' />
            )}
        </TouchableOpacity>
    );
};

export default GenerateButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: Spacing.m,
        borderRadius: Radius.l,
        alignItems: 'center',
        padding: Spacing.s
    },
    disabled: {
        opacity: 0.6,
    },
});