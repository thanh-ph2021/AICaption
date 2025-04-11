import { StyleSheet, View } from "react-native"
import { Notifier } from "react-native-notifier"

import { Fonts, Spacing } from "@constants"
import { TextComponent } from "@components"

export const showNotification = (title: string, Icon: () => React.ReactElement) => {
    Notifier.showNotification({
        duration: 2000,
        title: title,
        Component: (props) => {
            return (
                <View style={styles.container}>
                    <Icon />
                    <TextComponent color="black" text={props.title} style={Fonts.body3} />
                </View>
            )
        }
    })
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: Spacing.s,
        marginHorizontal: Spacing.s,
        marginVertical: Spacing.xxl,
        borderRadius: Spacing.s,
        alignItems: 'center',
        gap: Spacing.s,
        elevation: 6
    },
})