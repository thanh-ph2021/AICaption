export type ThemeColor = {
    // Core
    readonly primary: string
    readonly primaryLight: string
    readonly secondary?: string
    readonly accent: string
    readonly highlight: string

    // Backgrounds
    readonly background: string
    readonly containerBackground?: string
    readonly surface: string

    // Text
    readonly text?: string;
    readonly textPrimary: string;
    readonly textSecondary: string;

    // Status
    readonly info: string;

    // Inputs
    readonly placehodler: string;

}

export type ThemeData = {
    isDark: boolean,
    colors: ThemeColor
}

export type ThemeModel = {
    type: 'light' | 'dark',
    themeData: ThemeData
}