<template>
    <section class="projects-section mt-5 mt-sm-9 reveal">
        <div class="container p-0">
            <h2 class="h6 projects-title fw-regular mb-4">Projects</h2>
            <UiProjectList :projects="projects" />
        </div>
    </section>
</template>

<script setup>
import projects from '~/data/projects.json'
</script>
