import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ROUTES } from './routes'
import BottomTabsNavigator from './BottomTabsNavigator'
import { GenerateContentScreen, StatusBioDetailScreen } from '@screens'

const Stack = createNativeStackNavigator()

const RootNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.TABS} component={BottomTabsNavigator} />
        <Stack.Screen name={ROUTES.STATUS_BIO_DETAIL} component={StatusBioDetailScreen} />
        <Stack.Screen name={ROUTES.GENERATE_CONTENT} component={GenerateContentScreen} />
      </Stack.Navigator>
    )
  }
  
export default RootNavigator