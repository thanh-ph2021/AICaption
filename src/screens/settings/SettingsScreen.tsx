import React from "react"
import { View } from "react-native"

import { Container, TextComponent } from "@components"
import {Fonts} from "@constants"

const SetttingsScreen = () => {
    return (
        <Container>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TextComponent text="Settings" style={{ ...Fonts.h2 }} />
            </View>
        </Container>
    )
}

export default SetttingsScreen