export const useReveal = () => {
    onMounted(() => {
        const elements = document.querySelectorAll('.reveal')

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const siblings = Array.from(entry.target.parentElement.children)

                    siblings.forEach((el, i) => {
                        if (el.classList.contains('reveal')) {
                            el.style.setProperty('--delay', `${i * 100}ms`)

                            setTimeout(() => {
                                el.classList.add('visible')
                            }, i * 100)
                        }
                    })

                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: 0.2 })

        elements.forEach((el) => observer.observe(el))
    })
}