import React from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native'

import { Fonts, Radius, Spacing } from '@constants'
import { TextComponent } from '@components'

export interface Mood {
    label: string;
    image: any; // ImageRequireSource
}

interface MoodSelectorProps {
    moods: Mood[]
    selectedMood: string | null
    onSelectMood: (mood: string) => void
}

const MoodSelector: React.FC<MoodSelectorProps> = ({
    moods,
    selectedMood,
    onSelectMood,
}) => {
    return (
        <View style={styles.container}>
            <TextComponent text="Select a mood" style={Fonts.body3} />
            <FlatList
                data={moods}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.label}
                renderItem={({ item }) => {
                    const isSelected = item.label === selectedMood;
                    return (
                        <TouchableOpacity
                            style={[styles.moodItem, isSelected && styles.selectedMoodItem]}
                            onPress={() => onSelectMood(item.label)}
                        >
                            <Image source={item.image} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    )
                }}
                contentContainerStyle={{ gap: Spacing.m}}
                style={{alignSelf: 'center'}}
            />
        </View>
    )
}

export default MoodSelector

const styles = StyleSheet.create({
    container: {
        marginTop: Spacing.l,
        gap: Spacing.s,
    },
    moodItem: {
        width: 55,
        height: 55,
        backgroundColor: '#f1f1f1',
        borderRadius: Radius.circle,
        alignItems: 'center',
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
