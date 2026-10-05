<template>
    <section class="projects-section mt-5 mt-sm-9 reveal">
        <div class="container p-0">
            <div class="h6 projects-title fw-regular m-0">Projects</div>
            <div class="row mt-4 projects-cards">
                <div v-for="project in projects" :key="project.id">
                    <UiProjectCard :project="project" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import projects from '~/data/projects.json'
useReveal()
</script>

<style scoped lang="scss">
@media (min-width: 576px) {
    .projects-cards:hover :deep(.card) {
        opacity: 0.4;
    }

    .projects-cards :deep(.card:hover) {
        opacity: 1;
    }
}
</style>