import React, { useRef } from 'react'
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { ROUTES } from "./routes"
import { BottomTabParamList } from './type'
import { HomeScreen, SettingsScreen } from '@screens'
import { useTheme } from '@hooks'
import { Spacing, Radius, Sizes, Fonts } from '@constants'
import { AppBottomSheet, TextComponent, Icons } from '@components'


const Tab = createBottomTabNavigator<BottomTabParamList>()

const AppTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {

    const { colors } = useTheme()
    const bottomSheetRef = useRef<any>(null)

    const showBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.snapTo(0)
        }
    }

    const renderIcon = (route: string, isFocused: boolean) => {
        switch (route) {
            case ROUTES.HOME:
                return isFocused ? <Icons.HomeFill color={colors.primary} size={30} /> : <Icons.Home color={colors.primaryLight} size={30} />
            case ROUTES.CREATE:
                return isFocused ? <Icons.AddFill color={colors.primary} size={30} /> : <Icons.Add color={colors.primaryLight} size={30} />
            case ROUTES.SETTINGS:
                return isFocused ? <Icons.SettingsFill color={colors.primary} size={30} /> : <Icons.Settings color={colors.primaryLight} size={30} />
            default:
                return null
        }
    }
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            elevation: 6,
            backgroundColor: colors.background,
        }}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index

                const onPress = () => {
                    switch (route.name) {
                        case ROUTES.HOME:
                        case ROUTES.SETTINGS:
                            const event = navigation.emit({
                                type: "tabPress",
                                target: route.key,
                                canPreventDefault: true,
                            })
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name)
                            }
                            break
                        case ROUTES.CREATE:
                            showBottomSheet()
                    }
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={{
                            flex: 1,
                            alignItems: "center",
                            padding: 10,
                            backgroundColor: isFocused ? colors.primaryLight : colors.background,
                            borderRadius: Radius.l,
                            margin: Spacing.m
                        }}
                    >
                        {renderIcon(route.name, isFocused)}
                    </TouchableOpacity>
                )
            })}
            <AppBottomSheet
                ref={bottomSheetRef}
                snapPoints={[Sizes.height * 0.25]}
                backgroundStyle={{ backgroundColor: colors.surface }}
                containerStyle={{ margin: Spacing.l, borderRadius: Spacing.l }}
                enableHandlePanningGesture={false}
                enableContentPanningGesture={false}
                handleIndicatorStyle={{ display: 'none' }}
            >
                <View style={styles.contentContainer}>
                    <TextComponent text={'Create new'} style={{ ...Fonts.h3 }} />
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.item}>
                            <View style={[styles.iconWrapper, { backgroundColor: colors.secondary }]}>
                                <Icons.AddStatus color={'white'} size={20} />
                            </View>

                            <TextComponent text='Status' style={{ ...Fonts.body3 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <View style={[styles.iconWrapper, { backgroundColor: colors.accent }]}>
                                <Icons.AddBio color={'white'} size={20} />
                            </View>
                            <TextComponent text='Bio' style={{ ...Fonts.body3 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </AppBottomSheet>
        </View>
    );
}

const BottomTabsNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={ROUTES.HOME}
            tabBar={props => <AppTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                lazy: true
            }}

        >
            <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
            <Tab.Screen name={ROUTES.CREATE} component={HomeScreen} />
            <Tab.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
        </Tab.Navigator>
    )
}

export default BottomTabsNavigator

const styles = StyleSheet.create({
    contentContainer: {
        height: '60%',
        gap: Spacing.l,
        marginHorizontal: Spacing.xl
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xxl,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.m,
    },
    iconWrapper: {
        padding: Spacing.s,
        borderRadius: Radius.m,
    },
})