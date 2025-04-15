
import { ReactNode } from "react"
import { StatusBar, StyleProp, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useTheme } from "@hooks"
import { Spacing } from "@constants"

interface ContainerProps {
    children: ReactNode
    style?: StyleProp<ViewStyle>
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
    const { colors, isDark } = useTheme()
    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: colors.background, paddingTop: Spacing.m }, style]}>
            <StatusBar backgroundColor='transparent' translucent barStyle={isDark ? 'light-content' : 'dark-content'} />
            {children}
        </SafeAreaView>
    )
}

export default Container