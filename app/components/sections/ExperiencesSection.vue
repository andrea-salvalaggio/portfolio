<template>
    <section id="experience" class="experiences-section page-section">
        <h2 class="section-label reveal reveal--item">Experiences</h2>
        <ul class="card-list">
            <li v-for="(experience, i) in experiences" :key="experience.id" class="surface-card reveal reveal--item">
                <UiExperiencesLink :experience="experience" :version="`v${experiences.length - i}.0`" />
            </li>
        </ul>
    </section>
</template>

<script setup>
import experiences from '~/data/experiences.json'
</script>

