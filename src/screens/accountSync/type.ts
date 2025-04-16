import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { RootStackParamList } from "@navigations"
import { GeneratedItem } from "@store"

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ACCOUNT_SYNC'>
export type BackupDataModel = {
    generateDatas: GeneratedItem[],
    lastSyncTime: string
}