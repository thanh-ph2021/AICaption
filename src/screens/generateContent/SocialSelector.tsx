import React from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native'

import { Spacing } from '@constants'
import { getIcon } from '@utils'

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
    return (
        <View style={styles.container}>
            <FlatList
                data={socials}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    const isSelected = item === selectedSocial
                    return (
                        <TouchableOpacity
                            style={styles.moodItem}
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
    },
    moodItem: {
        justifyContent: 'center',
    },
    selectedMoodItem: {
        backgroundColor: '#4A90E2',
    },
    moodText: {
        fontSize: 14,
        color: '#333',
    },
    selectedMoodText: {
        color: '#fff',
        fontWeight: '600',
    },
})
