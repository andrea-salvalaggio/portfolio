<template>
    <div class="fan reveal">
        <div v-for="(card, i) in cards" :key="card.image" class="card border-0"
            :class="{ 'is-desktop-only': !card.mobile }" :style="cardStyles[i]" @mouseenter="hoveredIndex = i"
            @mouseleave="hoveredIndex = null">
            <NuxtImg format="webp" :src="card.image" :alt="card.alt" width="280" height="380" densities="x1 x2"
                fit="cover" decoding="async" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FanDeckProps } from '~/composables/useFanDeck'

const props = defineProps<FanDeckProps>()

const { hoveredIndex, cardStyles } = useFanDeck(props)
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.fan {
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    @include down($bp-xs) {
        height: 380px;
    }

    @include up($bp-md) {
        margin-bottom: $spacer-9;
    }

    .card {
        position: absolute;
        width: 280px;
        height: 380px;
        border-radius: $radius-5;
        overflow: clip;
        z-index: var(--z);
        transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(var(--s));
        transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
        will-change: transform;
        backface-visibility: hidden;

        @include down($bp-md) {
            z-index: var(--mz);
            transform: translate(var(--mx), var(--my)) rotate(var(--mr)) scale(var(--ms));

            &.is-desktop-only {
                display: none;
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        // Card size steps down with the viewport, later rules win
        @include down($bp-md) {
            width: 240px;
            height: 320px;
        }

        @include down($bp-sm) {
            width: 200px;
            height: 290px;
        }

        @include down($bp-xs) {
            width: 160px;
            height: 220px;
        }

        @include up($bp-sm) {
            border-radius: $radius-6;
        }
    }
}
</style>