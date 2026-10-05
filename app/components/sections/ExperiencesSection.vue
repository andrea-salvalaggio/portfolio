<template>
    <section class="experiences-section mt-5 mt-sm-9 reveal">
        <div class="container p-0">
            <div class="row">
                <h2 class="h6 fw-regular col-12 col-md-3 mb-4 mb-md-0">Experiences</h2>
                <div class="col-12 col-md-9 experiences-links">
                    <div class="experiences-links--wrapper">
                        <div v-for="experience in experiences" :key="experience.id">
                            <UiExperiencesLink :experience="experience" />
                        </div>
                        <a class="btn-link fw-light d-flex align-items-center justify-content-center text-decoration-none rounded-pill w-100 mt-2" target="_blank" href="https://linkedin.com/in/andrea-salvalaggio">
                            View Linkedin
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import experiences from '~/data/experiences.json'
useReveal()
</script>

<style scoped lang="scss">
@use "@/assets/scss/mixins/buttons" as *;

.experiences-links {
    &--wrapper {
        padding: $spacer-4;
        border-radius: $radius-5;
        border: 1px solid $gray-800;
        background-color: rgba($white, 0.02);
    }
}

.btn-link {
    color: $primary;
    background-color: $gray-900;
    border: 1px solid $gray-800;
    padding: $spacer-2 $spacer-4;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: rgba($white, 0.09);
    }
}
</style>