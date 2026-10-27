let observer: IntersectionObserver | null = null

const getObserver = () => {
    if (observer) return observer

    observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)

        visible.forEach((entry, i) => {
            const el = entry.target as HTMLElement
            el.style.setProperty('--delay', `${i * 100}ms`)
            el.classList.add('visible')
            observer?.unobserve(el)
        })
    }, { threshold: 0.2 })

    return observer
}

export const useReveal = () => {
    const observed: Element[] = []

    onMounted(() => {
        const io = getObserver()

        document.querySelectorAll<HTMLElement>('.reveal:not([data-reveal])').forEach((el) => {
            el.dataset.reveal = ''
            observed.push(el)
            io.observe(el)
        })
    })

    onBeforeUnmount(() => {
        observed.forEach((el) => observer?.unobserve(el))
    })
}
