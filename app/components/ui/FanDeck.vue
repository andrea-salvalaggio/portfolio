<template>
    <div ref="container" class="fan">
        <div v-for="(card, i) in visibleCards" :key="i" :ref="el => setCardRef(el, i)" class="card border-0"
            @mouseenter="onEnter(i)" @mouseleave="onLeave">
            <img :src="card.image" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onBeforeUpdate } from 'vue'
import { gsap } from 'gsap'

/* ------------------ STATE ------------------ */
const props = defineProps({
    cards: {
        type: Array,
        default: () => []
    }
})

const cardsRef = ref([])
const hoveredIndex = ref(null)
const isMobile = ref(false)

/* ------------------ CONFIG ------------------ */
const fanSettings = {
    spacing: 120,
    rotationIntensity: 10,
    arcIntensity: 10,
    scaleDecay: 0.06
}

const hoverBoost = 1.10
const hoverLift = 20
const pushForce = 100

const updateBreakpoint = () => {
    isMobile.value = window.innerWidth < 768
}

/* ------------------ COMPUTED ------------------ */
const visibleCards = computed(() => {
  return isMobile.value
    ? props.cards.slice(0, 2)
    : props.cards.slice(0, 5)
})

/* ------------------ REFS ------------------ */
const setCardRef = (el, i) => {
    if (!el) return
    cardsRef.value[i] = el
}

onBeforeUpdate(() => {
    cardsRef.value = []
})

/* ------------------ LAYOUT CORE ------------------ */
const render = () => {
    const els = cardsRef.value
    if (!els.length) return

    const total = els.length
    const centerIndex = Math.floor(total / 2)

    els.forEach((el, idx) => {
        const distanceToCenter = Math.abs(idx - centerIndex)
        const baseScale = 1 - distanceToCenter * fanSettings.scaleDecay

        let xOffset = (idx - centerIndex) * fanSettings.spacing
        let yOffset = Math.pow(distanceToCenter, 2) * fanSettings.arcIntensity
        let rotation = (idx - centerIndex) * fanSettings.rotationIntensity
        let scale = baseScale

        /* ------------------ HOVER LOGIC ------------------ */
        if (hoveredIndex.value !== null) {
            const distFromHover = idx - hoveredIndex.value
            const absDist = Math.abs(distFromHover)

            if (idx === hoveredIndex.value) {
                yOffset -= hoverLift
                scale = baseScale * hoverBoost
            } else {
                const direction = distFromHover > 0 ? 1 : -1
                const decay = pushForce / (absDist + 0.6)

                xOffset += direction * decay
                rotation += direction * (5 / (absDist + 0.2))
                scale = baseScale * 0.96
            }
        }

        gsap.to(el, {
            x: xOffset,
            y: yOffset,
            rotate: rotation,
            scale,
            duration: 0.5,
            ease: 'power3.out'
        })

        el.style.zIndex = 100 - distanceToCenter
    })
}

/* ------------------ EVENTS ------------------ */
const onEnter = (i) => {
    hoveredIndex.value = i
    render()
}

const onLeave = () => {
    hoveredIndex.value = null
    render()
}

/* ------------------ INIT ------------------ */
onMounted(async () => {
    updateBreakpoint()

    window.addEventListener('resize', () => {
        updateBreakpoint()
        render()
    })

    await nextTick()
    render()
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.fan {
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: $spacer-9;

    .card {
        position: absolute;
        width: 280px;
        height: 380px;
        border-radius: $radius-5;
        overflow: clip;
        will-change: transform;
        backface-visibility: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>