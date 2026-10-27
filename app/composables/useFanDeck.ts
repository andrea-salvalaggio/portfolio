import { ref, computed } from 'vue'
import { defaultFanSettings, hoverConfig } from '@/config/fanDeck.config'

export interface FanCardPosition {
    x?: number
    y?: number
    rotate?: number
    scale?: number
    z?: number
}

export interface FanCard {
    image: string
    alt: string
    // Position on mobile; cards without it are hidden below the md breakpoint
    mobile?: FanCardPosition
}

export interface FanDeckProps {
    cards: FanCard[]
    desktopFanSettings?: Partial<typeof defaultFanSettings>
}

export function useFanDeck(props: FanDeckProps) {
    const hoveredIndex = ref<number | null>(null)

    const settings = computed(() => ({ ...defaultFanSettings, ...props.desktopFanSettings }))

    // Transforms are exposed as CSS variables: the browser animates them
    // through a CSS transition, and SSR already renders the fanned layout
    const cardStyles = computed(() => {
        const total = props.cards.length
        const centerIndex = Math.floor(total / 2)
        const s = settings.value

        return props.cards.map((card, idx) => {
            const distCenter = Math.abs(idx - centerIndex)
            const baseScale = 1 - distCenter * s.scaleDecay

            let x = (idx - centerIndex) * s.spacing
            let y = Math.pow(distCenter, 2) * s.arcIntensity
            let rotate = (idx - centerIndex) * s.rotationIntensity
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

            const m = card.mobile ?? {}

            return {
                '--x': `${x}px`,
                '--y': `${y}px`,
                '--r': `${rotate}deg`,
                '--s': scale,
                '--z': 100 - distCenter,
                '--mx': `${m.x ?? 0}px`,
                '--my': `${m.y ?? 0}px`,
                '--mr': `${m.rotate ?? 0}deg`,
                '--ms': m.scale ?? 1,
                '--mz': m.z ?? 1
            }
        })
    })

    return {
        hoveredIndex,
        cardStyles
    }
}
