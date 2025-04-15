import React from 'react'
import { View, Switch, StyleSheet } from 'react-native'

import { TextComponent } from '@components'
import { Fonts, Spacing } from '@constants'
import { useTheme } from '@hooks'
import { useTranslation } from 'react-i18next'

interface EmojiToggleProps {
    value: boolean
    onValueChange: (val: boolean) => void
}

const EmojiToggle: React.FC<EmojiToggleProps> = ({ value, onValueChange }) => {
    const { colors } = useTheme()
    const {t} = useTranslation()

    return (
        <View style={styles.container}>
            <TextComponent text={t('InclEmoji')} style={Fonts.body3} />
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: colors.surface, true: colors.primaryLight }}
                thumbColor={value ? colors.primary : colors.placehodler}
            />
        </View>
    )
}

export default EmojiToggle

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Spacing.l,
    },
})
