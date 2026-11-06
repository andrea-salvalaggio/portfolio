<template>
    <section id="projects" class="projects-section page-section reveal">
        <h2 class="section-label">Projects</h2>
        <UiProjectList :projects="projects" />
    </section>
</template>

<script setup>
import projects from '~/data/projects.json'
</script>
