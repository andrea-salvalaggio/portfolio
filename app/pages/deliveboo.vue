<template>
    <div class="projects-page p-3 py-5 py-sm-8">
        <div class="container p-0">
            <div class="row reveal">
                <div class="col">
                    <h1 class="fw-bold">Deliveboo</h1>
                    <p>
                        Food delivery web app that allows customers to order food from their favorite restaurant without
                        registration, but entering only the data necessary for delivery (Credit card number, name,
                        address). Restaurateurs can register in the platform and create, modify and delete dishes and
                        see customers orders.
                    </p>
                </div>
            </div>
            <div class="projects-credits d-flex align-items-center mt-3 reveal">
                <NuxtImg format="webp" src="/img/profile.png" width="100" height="100" densities="x1 x2" class="img-fluid rounded-circle img-profile"
                    alt="Profile picture" />
                <div class="flex-grow-1 ms-3">
                    <div class="h6 title fw-light m-0">Andrea Salvalaggio</div>
                    <p class="m-0">
                        2022 – <a href="https://github.com/andrea-salvalaggio/laravel-deliveboo" target="_blank" rel="noopener noreferrer" aria-label="Visit project">Visit project</a>
                    </p>
                </div>
            </div>
            <div class="projects-thumb mt-5 mt-sm-9 reveal">
                <LazyUiGlareImage v-for="shot in screenshots" :key="shot.src" hydrate-on-visible>
                    <div class="bg-image">
                        <NuxtImg format="webp" :src="shot.src" :alt="shot.alt" width="1660" :height="shot.height" class="img-fluid"
                            sizes="100vw md:750px" loading="lazy" decoding="async" />
                    </div>
                </LazyUiGlareImage>
            </div>
        </div>
    </div>
</template>

<script setup>
const screenshots = [
    { src: '/img/projects/deliveboo-1.png', alt: 'Deliveboo project desktop', height: 923 },
    { src: '/img/projects/deliveboo-2.png', alt: 'Deliveboo project backoffice', height: 1730 },
    { src: '/img/projects/deliveboo-3.png', alt: 'Deliveboo project mobile', height: 923 }
]

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