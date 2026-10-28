// One delegated listener feeds the cursor position to every glowing button (see _general.scss)
export default defineNuxtPlugin(() => {
    document.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse') return

        const button = event.target.closest?.('.btn-link, .nav-cta')
        if (!button) return

        const rect = button.getBoundingClientRect()
        button.style.setProperty('--mx', `${event.clientX - rect.left}px`)
        button.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }, { passive: true })
})
