import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ROUTES } from './routes'
import BottomTabsNavigator from './BottomTabsNavigator'

const Stack = createNativeStackNavigator()

const RootNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.TABS} component={BottomTabsNavigator} />
      </Stack.Navigator>
    )
  }
  
export default RootNavigator