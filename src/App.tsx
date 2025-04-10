import { NavigationContainer } from "@react-navigation/native"
import RootNavigator from "./navigations/RootNavigator"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Provider } from "react-redux"
import { PortalProvider } from '@gorhom/portal'

import { store } from "@store"

function App() {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <PortalProvider>
                    <NavigationContainer>
                        <RootNavigator />
                    </NavigationContainer>
                </PortalProvider>
            </GestureHandlerRootView>
        </Provider>
    )
}

export default App