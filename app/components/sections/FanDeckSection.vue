<template>
    <UiFanDeck :cards="cards" :mobileCards="mobileCards" :desktopFanSettings="desktopFanSettings"
        :mobileFanSettings="mobileFanSettings" />
</template>

<script setup>
const cards = [
    { image: '/img/deck/bici-1.jpg' },
    { image: '/img/deck/andrea-elisa.jpg' },
    { image: '/img/deck/andrea.jpg' },
    { image: '/img/deck/bici-2.jpg' },
    { image: '/img/deck/sissi.jpg' }
]

const mobileCards = [
    { image: '/img/deck/bici-2.jpg' },
    { image: '/img/deck/andrea.jpg' },
    { image: '/img/deck/sissi.jpg' }
]

const desktopFanSettings = {
    spacing: 120,
    rotationIntensity: 10,
    arcIntensity: 10,
    scaleDecay: 0.06
}

const mobileFanSettings = {
    spacing: 80,
    rotationIntensity: 10,
    arcIntensity: 10,
    scaleDecay: 0.06
}
</script>