<template>
    <section class="projects-section mt-5 mt-sm-9">
        <div class="container p-0">
            <div class="h6 projects-title fw-light m-0">Projects</div>
            <div class="row row-cols-1 row-cols-sm-2 gx-3 gx-sm-4 mt-4 projects-cards">
                <div v-for="project in projects" :key="project.id">
                    <UiProjectCard :project="project" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import projects from '~/data/projects.json'
</script>

<style scoped lang="scss">
.projects-cards:hover :deep(.card) {
    opacity: 0.4;
}

.projects-cards :deep(.card:hover) {
    opacity: 1;
}
</style>