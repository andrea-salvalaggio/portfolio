<template>
    <a :href="project.url" class="card-link text-decoration-none" :aria-label="`View ${project.title}`">
        <div class="card flex-row-reverse flex-sm-column h-100 bg-transparent border-0 pb-4 pb-sm-0">
            <img :src="project.image" :alt="project.title" class="card-image rounded-1 col-5 col-sm-12 lazyload" />
            <div class="card-body d-flex flex-column p-0 mt-sm-3 pe-3 pe-sm-0">
                <div class="h5 card-title fw-medium mb-1 mb-sm-2">{{ project.title }}</div>
                <p class="card-text line-clamp-2 line-clamp-sm-3 fw-light">{{ project.description }}</p>
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

.card-image {
    height: fit-content;
}
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

@media (min-width: 576px) {
    .line-clamp-sm-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
</style>