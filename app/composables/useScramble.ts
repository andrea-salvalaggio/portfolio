const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const HOLD_MS = 250
const FLIP_MS = 40
const REVEAL_MS = 100

const randomChar = () => CHARSET[Math.floor(Math.random() * CHARSET.length)]!

// SSR and first render show the final text (no randomness, no hydration mismatch); the scramble starts on mount
export const useScramble = (text: string) => {
    const chars = ref(Array.from(text))
    const revealed = ref(text.length)
    let timer: ReturnType<typeof setInterval> | undefined

    const stop = () => clearInterval(timer)

    const play = () => {
        stop()
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const start = performance.now()
        revealed.value = 0
        chars.value = Array.from(text, (c) => (c === ' ' ? c : randomChar()))

        timer = setInterval(() => {
            revealed.value = Math.min(text.length, Math.floor(Math.max(0, performance.now() - start - HOLD_MS) / REVEAL_MS))
            chars.value = Array.from(text, (c, i) => (i < revealed.value || c === ' ' ? c : randomChar()))
            if (revealed.value >= text.length) stop()
        }, FLIP_MS)
    }

    onMounted(play)
    onBeforeUnmount(stop)

    return { chars, revealed, play }
}
