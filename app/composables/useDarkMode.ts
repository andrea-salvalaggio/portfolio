export const useDarkMode = () => {
    const colorMode = useColorMode()

    const isDark = computed(() => colorMode.value === 'dark')

    const currentTheme = computed(() => colorMode.value)

    const toggleTheme = () => {
        colorMode.preference =
            colorMode.value === 'dark' ? 'light' : 'dark'
    }

    const setLightTheme = () => {
        colorMode.preference = 'light'
    }

    const setDarkTheme = () => {
        colorMode.preference = 'dark'
    }

    const setSystemTheme = () => {
        colorMode.preference = 'system'
    }

    const themeIcon = computed(() =>
        isDark.value ? ['fas', 'sun'] : ['fas', 'moon']
    )

    return {
        currentTheme,
        isDark,
        toggleTheme,
        setLightTheme,
        setDarkTheme,
        setSystemTheme,
        themeIcon
    }
}