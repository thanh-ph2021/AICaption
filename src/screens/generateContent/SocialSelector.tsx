import React from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native'

import { Radius, Spacing } from '@constants'
import { getIcon } from '@utils'
import { useTheme } from '@hooks'

interface SocialSelectorProps {
    socials: string[]
    selectedSocial: string | null
    onSelectSocial: (social: string) => void
}

const SocialSelector: React.FC<SocialSelectorProps> = ({
    socials,
    selectedSocial,
    onSelectSocial,
}) => {
    const { colors } = useTheme()
    return (
        <View style={[styles.container, { backgroundColor: colors.surface}]}>
            <FlatList
                data={socials}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    const isSelected = item === selectedSocial
                    return (
                        <TouchableOpacity
                            style={styles.socialItem}
                            onPress={() => onSelectSocial(item)}
                        >
                            {getIcon(item, isSelected ? 50 : 24)}
                        </TouchableOpacity>
                    )
                }}
                contentContainerStyle={{ gap: Spacing.l }}
            />
        </View>
    )
}

export default SocialSelector

const styles = StyleSheet.create({
    container: {
        marginVertical: Spacing.l,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Radius.circle,
        paddingVertical: Spacing.s,
    },
    socialItem: {
        justifyContent: 'center',
    },
})
