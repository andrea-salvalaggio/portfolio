<template>
    <div ref="container" class="fan reveal">
        <div v-for="(card, i) in activeCards" :key="i" :ref="el => setCardRef(el, i)" class="card border-0"
            @mouseenter="onEnter(i)" @mouseleave="onLeave">
            <img :src="card.image" :alt="card.alt" width="280" height="380" decoding="async" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, nextTick, onBeforeUpdate } from 'vue'
import { useFanDeck } from '~/composables/useFanDeck'
useReveal()

const props = defineProps({
    cards: Array,
    mobileCards: Array,
    desktopFanSettings: Object,
    mobileFanSettings: Object
})

const {
    cardsRef,
    hoveredIndex,
    activeCards,
    updateBreakpoint,
    render
} = useFanDeck(props)

const setCardRef = (el, i) => {
    if (!el) return
    cardsRef.value[i] = el
}

onBeforeUpdate(() => {
    cardsRef.value = []
})

const onEnter = (i) => {
    hoveredIndex.value = i
    render()
}

const onLeave = () => {
    hoveredIndex.value = null
    render()
}

let resizeFrame = 0

const onResize = () => {
    cancelAnimationFrame(resizeFrame)
    resizeFrame = requestAnimationFrame(() => {
        updateBreakpoint()
        render()
    })
}

onMounted(async () => {
    updateBreakpoint()
    window.addEventListener('resize', onResize, { passive: true })

    await nextTick()
    render()
})

onBeforeUnmount(() => {
    cancelAnimationFrame(resizeFrame)
    window.removeEventListener('resize', onResize)
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

    @media (max-width: 320px) {
        height: 380px;
    }

    @media (min-width: 768px) {
        margin-bottom: $spacer-9;
    }

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

        @media (max-width: 320px) {
            width: 160px;
            height: 220px;
        }

        @media (min-width: 325px) and (max-width: 576px) {
            width: 200px;
            height: 290px;
        }

        @media(min-width: 576px) and (max-width: 768px) {
            width: 240px;
            height: 320px;
        }

        @media (min-width: 576px) {
            border-radius: $radius-6;
        }
    }
}
</style>