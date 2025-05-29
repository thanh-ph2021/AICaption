import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from 'react-native-splash-screen'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { ROUTES } from './routes'
import BottomTabsNavigator from './BottomTabsNavigator'
import { AboutScreen, AccountSyncScreen, DonateScreen, GenerateContentScreen, StatusBioDetailScreen } from '@screens'
import { useCheckVersion, useInitData } from "@hooks"
import { LoadingDialog } from '@components'

const Stack = createNativeStackNavigator()

const RootNavigator = () => {
  const { t } = useTranslation()
  const { version } = useCheckVersion()

  useInitData()
  useEffect(() => {
    SplashScreen.hide()
    version.onCheckVersion()
  }, [])

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.TABS} component={BottomTabsNavigator} />
        <Stack.Screen name={ROUTES.STATUS_BIO_DETAIL} component={StatusBioDetailScreen} />
        <Stack.Screen name={ROUTES.GENERATE_CONTENT} component={GenerateContentScreen} />
        <Stack.Screen name={ROUTES.ABOUT} component={AboutScreen} />
        <Stack.Screen name={ROUTES.ACCOUNT_SYNC} component={AccountSyncScreen} />
        <Stack.Screen name={ROUTES.DONATE} component={DonateScreen} />
      </Stack.Navigator>
      <View>
        <LoadingDialog
          description={t('updating', { something: version.state.progress.toFixed(0) })}
          visible={version.state.loading}
        />
      </View>
    </>
  )
}

export default RootNavigator