<template>
    <section id="experience" class="experiences-section page-section">
        <h2 class="section-label reveal reveal--item">Experiences</h2>
        <ul class="card-list">
            <li v-for="(experience, i) in experiences" :key="experience.id" class="surface-card reveal reveal--item"
                :class="{ 'experience-card--current': experience.current }">
                <UiExperiencesLink :experience="experience" :version="`v${experiences.length - i}.0`" />
            </li>
        </ul>
    </section>
</template>

<script setup>
import experiences from '~/data/experiences.json'
</script>

<style scoped lang="scss">
@property --border-angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
}

.surface-card.experience-card--current {
    border-color: transparent;
    background:
        linear-gradient($surface, $surface) padding-box,
        conic-gradient(from var(--border-angle), $gray-800 0deg, $gray-800 250deg, $gray-400 300deg, $blue 330deg, $gray-800 360deg) border-box;
    animation: experience-border 5s linear infinite;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
}

@keyframes experience-border {
    to {
        --border-angle: 360deg;
    }
}
</style>

