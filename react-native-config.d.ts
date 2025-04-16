declare module 'react-native-config' {
    export interface NativeConfig {
        GOOGLE_API_KEY?: string
        webClientId?: string
    }

    export const Config: NativeConfig
    export default Config
}