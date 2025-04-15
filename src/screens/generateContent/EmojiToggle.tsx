import React from 'react'
import { View, Switch, StyleSheet } from 'react-native'

import { TextComponent } from '@components'
import { Fonts, Spacing } from '@constants'
import { useTheme } from '@hooks'

interface EmojiToggleProps {
    value: boolean
    onValueChange: (val: boolean) => void
}

const EmojiToggle: React.FC<EmojiToggleProps> = ({ value, onValueChange }) => {
    const { colors } = useTheme()

    return (
        <View style={styles.container}>
            <TextComponent text='Include emoji' style={Fonts.body3} />
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
