<template>
    <a :href="project.link" class="card-link text-decoration-none" :aria-label="`View ${project.title}`">
        <div class="card h-100 bg-transparent border-0">
            <img :src="project.image" :alt="project.title" class="card-image rounded-1 lazyload" />
            <div class="card-body d-flex flex-column p-0 mt-3">
                <div class="h5 card-title fw-medium">{{ project.title }}</div>
                <p class="card-text line-clamp-3 fw-light">{{ project.description }}</p>
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

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>