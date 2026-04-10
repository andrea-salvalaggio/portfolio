export const useDarkMode = () => {
    const colorMode = useColorMode()

    const isDark = computed(() => colorMode.value === 'dark')

    const toggleTheme = () => {
        colorMode.preference =
            colorMode.value === 'dark' ? 'light' : 'dark'
    }

    return {
        colorMode,
        isDark,
        toggleTheme
    }
}