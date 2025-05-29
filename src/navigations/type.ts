import { ROUTES } from "./routes";

export type BottomTabParamList = {
    [ROUTES.HOME]: undefined,
    [ROUTES.CREATE]: undefined,
    [ROUTES.SETTINGS]: undefined,
}

export type RootStackParamList = {
    [ROUTES.TABS]: undefined,
    [ROUTES.STATUS_BIO_DETAIL]: { content: string, socialType: string, img: string, title?: string },
    [ROUTES.GENERATE_CONTENT]: { type: string },
    [ROUTES.ABOUT]: undefined,
    [ROUTES.ACCOUNT_SYNC]: undefined,
    [ROUTES.DONATE]: undefined,
}