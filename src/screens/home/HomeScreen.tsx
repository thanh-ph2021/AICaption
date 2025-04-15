import React, { useEffect } from 'react'
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { useAppSelector, useTheme } from '@hooks'
import { Container, TextComponent, Icons } from "@components"
import { Fonts, Spacing, Radius } from '@constants'
import { RootStackParamList, ROUTES } from '@navigations'
import { GeneratedItem, generatedList } from '@store'

const HomeScreen = () => {
    const { colors } = useTheme()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const datas: GeneratedItem[] = useAppSelector(generatedList)

    const renderItem = ({ item }: { item: GeneratedItem }) => {
        const containerStyle = [
            styles.itemContainer,
            { backgroundColor: colors.containerBackground },
            item.img ? styles.itemWithImage : null
        ]

        return (
            <TouchableOpacity
                style={containerStyle}
                onPress={() => navigation.navigate(ROUTES.STATUS_BIO_DETAIL, { content: item.content, socialType: item.socialType, img: item.img || '' })}>
                {item.img ? <Image source={{ uri: item.img }} style={styles.image} /> : null}
                <View style={styles.itemContent}>
                    <TextComponent text={item.content} style={Fonts.body4} numberOfLines={2} canExpand={false}/>
                    <View style={styles.timeRow}>
                        <Icons.Clock color={colors.text} size={20} />
                        <TextComponent text={moment(item.createdAt).startOf('hour').fromNow()} style={Fonts.body4} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <View style={styles.header}>
                <TextComponent text="AI Caption" style={Fonts.h2} upperCase/>
                <FlatList
                    data={datas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    style={styles.flatList}
                />
            </View>
        </Container>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header: {
        justifyContent: "center",
        alignItems: "center"
    },
    flatList: {
        width: "100%"
    },
    flatListContent: {
        padding: Spacing.m,
        gap: Spacing.m
    },
    itemContainer: {
        padding: 10,
        borderRadius: Radius.m
    },
    itemWithImage: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.s
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: Radius.circle
    },
    itemContent: {
        flexShrink: 1
    },
    timeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: Spacing.s,
        gap: Spacing.s
    }
})