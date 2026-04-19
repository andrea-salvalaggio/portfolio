<template>
    <section class="experiences-section mt-5 mt-sm-9">
        <div class="container p-0">
            <div class="row">
                <h2 class="h6 fw-light col-12 col-md-3 mb-4 mb-md-0">Experiences</h2>
                <div class="col-12 col-md-9 experiences-links">
                    <div class="row">
                        <div v-for="experience in experiences" :key="experience.id">
                            <UiExperiencesLink :experience="experience" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import experiences from '~/data/experiences.json'
</script>

<style scoped lang="scss">
@use "@/assets/scss/mixins/buttons" as *;
@include link-hover-fade(".experiences-links");
</style>