import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { launchImageLibrary, launchCamera, Asset } from 'react-native-image-picker'

import { Radius, Spacing } from "@constants"
import { useTheme } from "@hooks"
import Icons from '@components/Icons'
import TextComponent from '@components/TextComponent'

interface ImageSelectorProps {
    imageUri: string | null
    onImageSelected: (uri: string) => void
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ imageUri, onImageSelected }) => {
    const { colors } = useTheme()

    const pickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.8,
            },
            (response) => {
                if (response.assets && response.assets.length > 0) {
                    const asset: Asset = response.assets[0]
                    if (asset.uri) {
                        onImageSelected(asset.uri)
                    }
                }
            }
        )
    }

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: colors.surface }]} onPress={pickImage}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Icons.Gallery size={24} color={colors.placehodler}/>
                    <TextComponent text="pickImage" style={{ marginTop: Spacing.s, color: colors.placehodler }} />
                </View>
            )}
        </TouchableOpacity>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
    container: {
        marginTop: Spacing.l,
        height: 180,
        borderRadius: Radius.l,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
})
