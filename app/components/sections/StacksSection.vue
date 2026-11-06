<template>
    <section id="stack" class="stacks-section page-section">
        <h2 class="section-label reveal">Stack</h2>
        <ul class="card-grid">
            <li v-for="stack in stacks" :key="stack.id" class="stack-item d-flex align-items-center reveal reveal--item">
                <span class="stack-icon d-flex align-items-center justify-content-center" :style="{ '--tag-color': stack.color }">
                    <font-awesome-icon :icon="stack.icon" aria-hidden="true" />
                </span>
                <span>
                    <span class="stack-label d-block">{{ stack.label }}</span>
                    <span class="stack-description d-block">{{ stack.description }}</span>
                </span>
            </li>
        </ul>
    </section>
</template>

<script setup>
import stacks from '~/data/stacks.json'
</script>

<style scoped lang="scss">
.stack-item {
    gap: $spacer-3;
    padding: $spacer-3;
    border: 1px solid transparent;
    border-radius: $radius-3;
    transition:
        background-color 0.6s ease,
        border-color 0.6s ease,
        opacity 1.8s cubic-bezier(0.25, 1, 0.5, 1) var(--delay, 0ms),
        transform 1.6s cubic-bezier(0.25, 1, 0.5, 1) var(--delay, 0ms);

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: $gray-800;
            background-color: $surface;
        }
    }
}

.stack-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    font-size: $font-size-small;
    color: var(--tag-color);
    border: 1px solid $gray-800;
    border-radius: $radius-2;
    background-color: $surface;
}

.stack-label {
    font-size: 16px;
    font-weight: $font-weight-medium;
    line-height: 20px;
    color: $light;
}

.stack-description {
    font-size: 15px;
    line-height: 24px;
    color: $gray-400;
}
</style>
