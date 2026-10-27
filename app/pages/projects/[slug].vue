<template>
    <div class="projects-page p-3 py-5 py-sm-8">
        <div class="container p-0">
            <div class="row reveal">
                <div class="col">
                    <h1 class="fw-bold">{{ project.title }}</h1>
                    <p>{{ project.longDescription }}</p>
                </div>
            </div>
            <div class="projects-credits d-flex align-items-center mt-3 reveal">
                <NuxtImg format="webp" src="/img/profile.png" width="100" height="100" densities="x1 x2" class="img-fluid rounded-circle img-profile"
                    alt="Profile picture" />
                <div class="flex-grow-1 ms-3">
                    <div class="h6 title fw-light m-0">Andrea Salvalaggio</div>
                    <p class="m-0">
                        {{ project.year }} – <a :href="project.repo" target="_blank" rel="noopener noreferrer" aria-label="Visit project">Visit project</a>
                    </p>
                </div>
            </div>
            <div class="projects-thumb mt-5 mt-sm-9 reveal">
                <LazyUiGlareImage v-for="shot in project.screenshots" :key="shot.src" hydrate-on-visible>
                    <div class="bg-image">
                        <NuxtImg format="webp" :src="shot.src" :alt="shot.alt" width="1660" :height="shot.height" class="img-fluid"
                            sizes="100vw md:750px" loading="lazy" decoding="async" />
                    </div>
                </LazyUiGlareImage>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import projects from '~/data/projects.json'

// Re-run setup (and the SEO tags) when navigating between two projects
definePageMeta({
    key: (route) => route.fullPath
})

const route = useRoute()

// Only projects with a detail page have a slug and screenshots
const project = projects.find((item) => 'slug' in item && item.slug === route.params.slug)

if (!project || !('screenshots' in project)) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

usePageSeo({
    title: `${project.title} | Andrea Salvalaggio`,
    description: project.seoDescription ?? project.description,
    path: `/projects/${project.slug}`
})

useReveal()
</script>

<style lang="scss">
.projects-page {

    .img-profile {
        width: 50px;
        height: 50px;
    }

    .projects-credits {
        .title {
            color: $primary;
        }
    }

    .projects-thumb {
        img {
            border-radius: $radius-5;
        }
    }
}
</style>