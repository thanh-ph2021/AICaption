import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector, useTheme } from '@hooks'
import { Container, TextComponent, Icons, AppModal } from "@components"
import { Fonts, Spacing, Radius } from '@constants'
import { RootStackParamList, ROUTES } from '@navigations'
import { GeneratedItem, generatedList } from '@store'
import { name } from '../../../package.json'
import { removeGeneratedItem } from '@store/generateSlice'
import { showNotification } from '@utils'

const HomeScreen = () => {
    const { colors } = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const datas: GeneratedItem[] = useAppSelector(generatedList)
    const [itemToDelete, setItemToDelete] = useState<GeneratedItem | null>(null)
    const [visible, setVisible] = useState<boolean>(false)

    const onShowModal = (item: GeneratedItem) => {
        setVisible(true)
        setItemToDelete(item)
    }

    const confirmDelete = () => {
        if (itemToDelete) {
            dispatch(removeGeneratedItem(itemToDelete.id))
            setItemToDelete(null)
            setVisible(false)
        }
        showNotification(t('deleteSuccess'), () => <Icons.Success size={30} />)
    }

    const cancelDelete = () => {
        setItemToDelete(null)
        setVisible(false)
    }

    const renderItem = ({ item }: { item: GeneratedItem }) => {

        const renderRightActions = () => (
            <TouchableOpacity
                style={[styles.deleteButton, { backgroundColor: colors.accent || 'red' }]}
                onPress={() => onShowModal(item)}
            >
                <Icons.Trash color="white" size={24} />
            </TouchableOpacity>
        )
        const containerStyle = [
            styles.itemContainer,
            { backgroundColor: colors.containerBackground },
            item.img ? styles.itemWithImage : null
        ]

        return (
            <Swipeable renderRightActions={renderRightActions}>
                <TouchableOpacity
                    style={containerStyle}
                    onPress={() => navigation.navigate(ROUTES.STATUS_BIO_DETAIL, { content: item.content, socialType: item.socialType, img: item.img || '' })}>
                    {item.img ? <Image source={{ uri: item.img }} style={styles.image} /> : null}
                    <View style={styles.itemContent}>
                        <TextComponent text={item.content} style={Fonts.body4} numberOfLines={2} canExpand={false} />
                        <View style={styles.timeRow}>
                            <Icons.Clock color={colors.text} size={20} />
                            <TextComponent text={moment(item.createdAt).startOf('hour').fromNow()} style={Fonts.body4} />
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        )
    }

    return (
        <Container>
            <View style={styles.header}>
                <TextComponent text={name} style={Fonts.h2} upperCase />
                <FlatList
                    data={datas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    style={styles.flatList}
                />
            </View>
            <View>
                <AppModal
                    visible={visible}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    title={'areYouSure'}
                    message={'doYouWantToDelete'}
                    confirmText={'delete'}
                    cancelText={'cancel'}
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
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: Radius.m,
        marginLeft: Spacing.m
    }
})