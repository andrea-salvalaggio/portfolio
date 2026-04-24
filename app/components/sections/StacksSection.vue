<template>
    <section class="stacks-section p-3 py-5 py-sm-8">
        <div class="container p-0">
            <div class="row reveal">
                <div class="col">
                    <h1 class="h2 fw-bold">Stack</h1>
                    <p>These are my superpowers!</p>
                </div>
            </div>
            <div class="stacks-languages mt-5 mt-sm-9 reveal">
                <div class="row">
                    <h2 class="h6 fw-regular col-12 col-md-3 mb-4 mb-md-0">Languages</h2>
                    <div class="col-12 col-md-9 stacks-links">
                        <div class="row flex-wrap g-2">
                            <div class="col-12 col-md-6" v-for="stack in stacks" :key="stack.id">
                                <UiStackLink :stack="stack" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import stacks from '~/data/stacks.json'
useReveal()
</script>

<style scoped lang="scss">
@use "@/assets/scss/mixins/buttons" as *;
@include link-hover-fade(".stacks-links");
</style>