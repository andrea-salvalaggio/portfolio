<template>
    <span class="stack-tag fw-light d-inline-flex align-items-center rounded-pill" :style="{ '--tag-color': color }">
        <font-awesome-icon :icon="icon" class="me-2" aria-hidden="true" /> {{ label }}
    </span>
</template>

<script setup lang="ts">
defineProps<{
    label: string
    icon: string[]
    color: string
}>()
</script>

<style scoped lang="scss">
// Same surface as the link pills; brand colors are tuned to stay above 4.5:1 on $gray-900
.stack-tag {
    color: var(--tag-color);
    border: 1px solid $gray-800;
    background-color: $gray-900;
    padding: .375rem $spacer-4;
    white-space: nowrap;
}
</style>
