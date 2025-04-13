import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Icons, TextComponent } from '@components'
import { useTheme } from '@hooks'
import { Fonts, Radius, Spacing } from '@constants'

interface OptionSelectorProps {
    label: string
    selectedValue: string
    onPress: () => void
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
    label,
    selectedValue,
    onPress,
}) => {
    const { colors } = useTheme()
    return (
        <View style={styles.container}>
            <TextComponent text={label} style={Fonts.body3} />
            <TouchableOpacity style={styles.selector} onPress={onPress}>
                <Text style={styles.value}>{selectedValue}</Text>
                <Icons.ArrowDown size={24} color={colors.text} />
            </TouchableOpacity>
        </View>
    )
}

export default OptionSelector

const styles = StyleSheet.create({
    container: {
        marginTop: Spacing.l,
        gap: Spacing.s,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    selector: {
        backgroundColor: '#f0f0f0',
        borderRadius: Radius.l,
        paddingHorizontal: Spacing.l,
        paddingVertical: Spacing.s,
        gap: Spacing.s,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    value: {
        fontSize: 14,
    },
})
