<template>
    <div ref="container" class="fan">
        <div v-for="(card, i) in activeCards" :key="i" :ref="el => setCardRef(el, i)" class="card border-0"
            @mouseenter="onEnter(i)" @mouseleave="onLeave">
            <img :src="card.image" :alt="card.alt"/>
        </div>
    </div>
</template>

<script setup>
import { onMounted, nextTick, onBeforeUpdate } from 'vue'
import { useFanDeck } from '~/composables/useFanDeck'

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
    }
}
</style>