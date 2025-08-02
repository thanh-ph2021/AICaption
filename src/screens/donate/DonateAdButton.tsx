import {
    AdEventType,
    RewardedAd,
    RewardedAdEventType,
    TestIds,
} from 'react-native-google-mobile-ads'
import { useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'

import { showNotification } from '@utils'
import { Icons, TextComponent } from '@components'
import { useTheme } from '@hooks'
import { Fonts, Radius, Spacing } from '@constants'

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-1981952654375968/4030016368'
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
})

export default function DonateAdButton() {
    const [loaded, setLoaded] = useState(false)
    const [isShowing, setIsShowing] = useState(false)
    const { t } = useTranslation()
    const { colors } = useTheme()

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(
            RewardedAdEventType.LOADED,
            () => setLoaded(true)
        )

        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            (reward) => {
                showNotification(t('ad_thank_you'), () => <Icons.Success size={30} />)
            }
        )

        const unsubscribeClosed = rewarded.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                setIsShowing(false)
                setLoaded(false)
                rewarded.load()
            }
        )

        rewarded.load()

        return () => {
            unsubscribeLoaded()
            unsubscribeEarned()
            unsubscribeClosed()
        }
    }, [])

    const showAd = () => {
        if (loaded && !isShowing) {
            setIsShowing(true)
            rewarded.show()
            setLoaded(false)
        } else {
            showNotification(t('ad_not_ready'), () => <Icons.Info size={30} color={colors.primary} />)
        }
    }

    return (
        <View style={[styles.sectionContainer, { backgroundColor: colors.background }]}>
            <TouchableOpacity
                style={styles.rowItem}
                onPress={showAd}
                disabled={!loaded || isShowing}
            >
                <View style={styles.rowLeftContainer}>
                    <View style={[styles.iconContainer,]}>
                        <Icons.AdMob size={24} />
                    </View>
                    {!loaded || isShowing ? <ActivityIndicator color={colors.primary} size={'small'} /> : <TextComponent text={t('watch_ad')} style={Fonts.body3} />}
                </View>
                <Icons.ArrowRight color={colors.text} size={24} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        justifyContent: 'center',
        marginHorizontal: Spacing.l,
        padding: Spacing.m,
        marginTop: Spacing.l,
        borderRadius: Radius.l,
        elevation: 6,
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Radius.l,
        justifyContent: 'space-between',
    },
    rowLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.m,
    },
    iconContainer: {
        padding: Spacing.s,
        borderRadius: Radius.l,
    },
})