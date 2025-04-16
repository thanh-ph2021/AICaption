import { AppRegistry } from 'react-native'
import './src/i18n/i18n.config.ts'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import Config from 'react-native-config'

import { name as appName } from './app.json'
import App from './src/App'

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.file'],
    webClientId: Config.webClientId,
})

AppRegistry.registerComponent(appName, () => App)
