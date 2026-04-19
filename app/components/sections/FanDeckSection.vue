<template>
    <UiFanDeck :cards="cards" :mobileCards="mobileCards" :desktopFanSettings="desktopFanSettings"
        :mobileFanSettings="mobileFanSettings" />
</template>

<script setup>
const cards = [
    { image: '/img/deck/bici-1.jpg', alt: 'Andrea in bici' },
    { image: '/img/deck/andrea-elisa.jpg', alt: 'Andrea ed Elisa' },
    { image: '/img/deck/andrea.jpg', alt: 'Ritratto di Andrea' },
    { image: '/img/deck/bici-2.jpg', alt: 'Andrea in bici & company' },
    { image: '/img/deck/sissi.jpg', alt: 'Sissi' }
]

const mobileCards = [
    { image: '/img/deck/andrea-elisa.jpg', alt: 'Andrea ed Elisa' },
    { image: '/img/deck/andrea.jpg', alt: 'Ritratto di Andrea' },
    { image: '/img/deck/bici-2.jpg', alt: 'Andrea in bici & company' },
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