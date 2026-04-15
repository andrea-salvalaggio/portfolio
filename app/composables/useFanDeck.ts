import { ref, computed } from 'vue'
import { gsap } from 'gsap'
import { defaultFanSettings, hoverConfig } from '@/config/fanDeck.config'

export function useFanDeck(props) {
    const cardsRef = ref([])
    const hoveredIndex = ref(null)
    const isMobile = ref(false)

    const updateBreakpoint = () => {
        isMobile.value = window.innerWidth < 768
    }

    const activeCards = computed(() => {
        return isMobile.value && props.mobileCards?.length
            ? props.mobileCards
            : props.cards
    })

    const activeSettings = computed(() => {
        return isMobile.value
            ? { ...defaultFanSettings, ...props.mobileFanSettings }
            : { ...defaultFanSettings, ...props.desktopFanSettings }
    })

    const render = () => {
        const els = cardsRef.value
        if (!els.length) return

        const total = els.length
        const centerIndex = Math.floor(total / 2)

        els.forEach((el, idx) => {
            const settings = activeSettings.value

            const distCenter = Math.abs(idx - centerIndex)
            const baseScale = 1 - distCenter * settings.scaleDecay

            let x = (idx - centerIndex) * settings.spacing
            let y = Math.pow(distCenter, 2) * settings.arcIntensity
            let rotate = (idx - centerIndex) * settings.rotationIntensity
            let scale = baseScale

            if (hoveredIndex.value !== null) {
                const d = idx - hoveredIndex.value
                const ad = Math.abs(d)

                if (idx === hoveredIndex.value) {
                    y -= hoverConfig.lift
                    scale = baseScale * hoverConfig.boost
                } else {
                    const dir = d > 0 ? 1 : -1
                    const push = hoverConfig.pushForce / (ad + 0.6)

                    x += dir * push
                    rotate += dir * (5 / (ad + 0.2))
                    scale = baseScale * 0.96
                }
            }

            gsap.to(el, {
                x,
                y,
                rotate,
                scale,
                duration: 0.5,
                ease: 'power3.out'
            })

            el.style.zIndex = 100 - distCenter
        })
    }

    return {
        cardsRef,
        hoveredIndex,
        isMobile,
        activeCards,
        updateBreakpoint,
        render
    }
}