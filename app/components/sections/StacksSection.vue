<template>
    <section id="stack" class="stacks-section mt-5 mt-sm-9 reveal">
        <div class="container p-0">
            <div class="row">
                <h2 class="section-label col-12 col-md-3 mb-4 mb-md-0">Stack</h2>
                <div class="col-12 col-md-9">
                    <ul class="stack-tags list-unstyled d-flex flex-wrap m-0">
                        <li v-for="stack in stacks" :key="stack.id">
                            <UiStackTag :label="stack.label" :icon="stack.icon" :color="stack.color" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import stacks from '~/data/stacks.json'
</script>

<style scoped lang="scss">
// Keeps the title clear of the sticky header when landing on /about#stack
.stacks-section {
    scroll-margin-top: 8rem;
}

.stack-tags {
    gap: $spacer;
}
</style>
