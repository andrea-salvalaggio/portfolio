<template>
    <a :href="project.url" class="card-link text-decoration-none d-block mb-4" :aria-label="`View ${project.title}`" :target="project.target">
        <div class="card flex-row-reverse align-items-center h-100" :class="project.title.toLowerCase()">
            <div class="card-image col-4">
                <img :src="project.image" :alt="project.title" class="h-100 w-100" fetchpriority="high"/>
            </div>
            <div class="card-body d-flex flex-column p-0 pe-3">
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

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card {
    padding: $spacer-4;
    border-radius: $radius-5;
    border: 1px solid $gray-800;
    background-color: rgba($white, 0.02);

    .card-title {
        color: $primary;
    }

    .card-text {
        line-height: $line-height-big;
    }

    .card-image {
        overflow: clip;
        border-radius: $radius-4;
    
        img {
            aspect-ratio: 5 / 3;
            object-fit: cover;
        }

        @media (max-width: 576px) {
            border-radius: 1.25rem;
        }
    }
}

@media (min-width: 576px) {
    .card {
        opacity: 1;
        transition: opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1);

        .card-image {
            transition: box-shadow 0.6s cubic-bezier(0.25, 1, 0.5, 1);

            img {
                height: fit-content;
                transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            }
        }

        &:hover {
            opacity: 1;
            background-color: rgba($white, 0.05);

            .card-image {
                img {
                    transform: scale(1.05);
                }
            }
        }
    }

    .line-clamp-sm-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
</style>