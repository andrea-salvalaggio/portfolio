export const useDarkMode = () => {
    const isDark = useState<boolean>('dark-mode', () => false)

    // Apply theme to DOM
    const applyTheme = () => {
        if (import.meta.client) {
            document.documentElement.setAttribute(
                'data-theme',
                isDark.value ? 'dark' : 'light'
            )
        }
    }

    const toggleDarkMode = () => {
        isDark.value = !isDark.value
        applyTheme()

        // Save preference in localStorage
        if (import.meta.client) {
            localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
        }
    }

    // Initialize: read saved preference or system preference
    const initDarkMode = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('theme')
            if (saved) {
                isDark.value = saved === 'dark'
            } else {
                isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
            }
            applyTheme()
        }
    }

    return { isDark, toggleDarkMode, initDarkMode }
}