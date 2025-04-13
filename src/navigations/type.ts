import { ROUTES } from "./routes";

export type BottomTabParamList = {
    [ROUTES.HOME]: undefined,
    [ROUTES.CREATE]: undefined,
    [ROUTES.SETTINGS]: undefined,
}

export type RootStackParamList = {
    [ROUTES.TABS]: undefined,
    [ROUTES.STATUS_BIO_DETAIL]: { content: string, socialType: string, img: string },
    [ROUTES.GENERATE_CONTENT]: { type: string },
}