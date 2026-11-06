<template>
    <ul class="card-grid">
        <li v-for="project in projects" :key="project.id">
            <a :href="project.url" :target="project.target" rel="noopener noreferrer"
                class="project-card surface-card d-flex flex-column text-decoration-none" :style="{ '--accent': project.accent }">
                <div class="project-thumb">
                    <NuxtImg format="webp" :src="project.image" alt="" width="520" height="312" sizes="100vw sm:270px"
                        loading="lazy" decoding="async" class="project-image" />
                </div>
                <div class="project-body">
                    <h3 class="project-title mb-1">
                        {{ project.title }}
                        <span class="visually-hidden">(opens in a new tab)</span>
                    </h3>
                    <p class="project-description m-0">{{ project.description }}</p>
                </div>
            </a>
        </li>
    </ul>
</template>

<script setup lang="ts">
interface Project {
    id: number
    title: string
    description: string
    image: string
    url: string
    target: string
    accent?: string
}

defineProps<{ projects: Project[] }>()
</script>

<style scoped lang="scss">
.project-card {
    height: 100%;
    padding: $spacer-3;
    transition: border-color 0.3s ease, box-shadow 0.4s ease, transform 160ms cubic-bezier(0.25, 1, 0.5, 1);

    &:active {
        transform: scale(0.985);
    }
}

.project-thumb {
    aspect-ratio: 5 / 3;
    overflow: clip;
    border-radius: $radius-2;
    background-color: $dark;
}

.project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.project-body {
    padding: $spacer-3 $spacer-1 $spacer-1;
}

.project-title {
    font-size: 16px;
    font-weight: $font-weight-medium;
    line-height: 20px;
    color: $light;
}

.project-description {
    display: -webkit-box;
    overflow: hidden;
    font-size: 16px;
    line-height: 24px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
}

@media (hover: hover) and (pointer: fine) {
    .project-card:hover,
    .project-card:focus-visible {
        border-color: color-mix(in srgb, var(--accent, #{$gray-700}) 55%, transparent);
        box-shadow: 0 0 3rem 0 color-mix(in srgb, var(--accent, transparent) 18%, transparent);

        .project-image {
            transform: scale(1.04);
        }
    }
}
</style>
