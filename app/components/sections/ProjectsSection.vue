<template>
    <section class="projects-section mt-5 mt-sm-9 reveal">
        <div class="container p-0">
            <h2 class="h6 projects-title mb-4">Projects</h2>
            <UiProjectList :projects="projects" />
        </div>
    </section>
</template>

<script setup>
import projects from '~/data/projects.json'
</script>

<style scoped lang="scss">
/* A quiet label, so the section title does not compete with the project titles */
.projects-title {
    font-size: $font-size-tiny;
    font-weight: $font-weight-regular;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $gray-500;
}
</style>
