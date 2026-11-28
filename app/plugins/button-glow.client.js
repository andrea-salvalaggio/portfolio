// One delegated listener feeds the cursor position to every glowing button (see _general.scss),
// and pulls the header Email button (with its light ring) a few px toward the cursor
export default defineNuxtPlugin(() => {
    const still = matchMedia('(prefers-reduced-motion: reduce)')
    const mouse = matchMedia('(hover: hover) and (pointer: fine)')

    document.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse') return

        const button = event.target.closest?.('.btn-link, .nav-cta')
        if (!button) return

        const rect = button.getBoundingClientRect()
        button.style.setProperty('--mx', `${event.clientX - rect.left}px`)
        button.style.setProperty('--my', `${event.clientY - rect.top}px`)

        const magnet = button.closest('.nav-cta-ring')
        if (!magnet || still.matches || !mouse.matches) return

        const box = magnet.getBoundingClientRect()
        magnet.style.translate = `${(event.clientX - box.left - box.width / 2) * 0.25}px ${(event.clientY - box.top - box.height / 2) * 0.35}px`
    }, { passive: true })

    document.addEventListener('pointerout', (event) => {
        const magnet = event.target.closest?.('.nav-cta-ring')
        if (magnet && !magnet.contains(event.relatedTarget)) magnet.style.translate = ''
    }, { passive: true })
})
