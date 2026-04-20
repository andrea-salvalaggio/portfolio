export const useDarkMode = () => {
    const colorMode = useColorMode()

    const isDark = computed(() => colorMode.value === 'dark')

    const toggleTheme = () => {
        colorMode.preference = isDark.value ? 'light' : 'dark'
    }

    return {
        isDark,
        toggleTheme
    }
}