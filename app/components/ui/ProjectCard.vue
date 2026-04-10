<template>
    <a :href="project.link" class="card-link text-decoration-none" target="_blank" :aria-label="`View ${project.title}`">
        <div class="card h-100 border-0">
            <img :src="project.image" :alt="project.title" class="card-image rounded-1 lazyload" />
            <div class="card-body d-flex flex-column p-0 mt-3">
                <div class="card-title fw-medium">{{ project.title }}</div>
                <p class="card-text fw-light">{{ project.description }}</p>
            </div>
        </div>
    </a>
</template>

<script setup>
defineProps({
    project: {
        type: Object,
        required: true
    }
})
</script>