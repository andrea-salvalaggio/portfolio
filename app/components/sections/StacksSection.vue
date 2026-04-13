<template>
    <section class="stacks-section p-3">
        <div class="container p-0">
            <div class="row">
                <div class="col">
                    <h1 class="h2 fw-bold">Stack</h1>
                    <p>These are my superpowers!</p>
                </div>
            </div>
            <div class="stacks-languages row mb-4">
                <h2 class="h6 fw-light col-12 col-md-3 mb-4 mb-md-0">Languages</h2>
                <div class="col-12 col-md-9">
                    <div class="row flex-wrap g-2">
                        <div class="col-12 col-md-6" v-for="stack in stacks" :key="stack.id">
                            <UiStackLink :stack="stack" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import stacks from '~/data/stacks.json'
</script>

<style scoped lang="scss">
.stacks-section,
.stacks-languages {
    margin-top: $spacer-8;
}
</style>