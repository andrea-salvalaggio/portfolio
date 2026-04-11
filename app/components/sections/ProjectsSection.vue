<template>
    <section class="projects-section p-3">
        <div class="container p-0">
            <div class="h6 projects-title">Projects</div>
            <div class="row row-cols-2 gx-3 gx-sm-4 mt-4">
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
.projects-section {
    margin-top: $spacer-8;

    .projects-title {
        font-weight: $font-weight-light;
    }
}
</style>