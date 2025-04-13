import { StyleSheet } from "react-native"

import { Spacing } from "@constants"


const UtilStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Spacing.l
    },
    
    headerSpacer: {
        width: 30,
        height: 30
    },
})

export default UtilStyles