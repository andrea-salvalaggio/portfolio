<template>
    <a :href="href" class="btn-link" target="_blank" rel="noopener noreferrer">
        {{ label }}
        <span class="visually-hidden">(opens in a new tab)</span>
        <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="btn-icon" alt="" aria-hidden="true" >
    </a>
</template>

<script setup lang="ts">
defineProps<{
    href: string
    label: string
}>()
</script>

<style scoped lang="scss">
.btn-icon {
    margin-left: $spacer-1;
    transform: scale(1.35);
}
</style>
