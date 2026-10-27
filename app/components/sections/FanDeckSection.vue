<template>
    <UiFanDeck :cards="cards" />
</template>

<script setup lang="ts">
import type { FanCard } from '~/composables/useFanDeck'

const cards: FanCard[] = [
    { image: '/img/deck/bici-1.jpg', alt: 'Andrea in bici' },
    {
        image: '/img/deck/andrea-elisa.jpg',
        alt: 'Andrea ed Elisa',
        mobile: { x: -65, y: -60, rotate: -5, scale: 1, z: 0 }
    },
    {
        image: '/img/deck/andrea.jpg',
        alt: 'Ritratto di Andrea',
        mobile: { x: 55, y: 105, rotate: 5, scale: 1.1, z: 1 }
    },
    { image: '/img/deck/bici-2.jpg', alt: 'Andrea in bici & company' },
    { image: '/img/deck/sissi.jpg', alt: 'Sissi' }
]
</script>
