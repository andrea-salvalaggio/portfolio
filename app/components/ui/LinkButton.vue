<template>
    <a :href="href" class="btn-link fw-light d-flex align-items-center justify-content-between text-decoration-none rounded-pill w-100"
        target="_blank" rel="noopener noreferrer" :aria-label="label">
        <div class="d-flex align-items-center">
            <font-awesome-icon v-if="icon" :icon="icon" class="fs-5 me-2" /> {{ label }}
        </div>
        <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="btn-icon" alt="" aria-hidden="true" >
    </a>
</template>

<script setup lang="ts">
defineProps<{
    href: string
    label: string
    icon?: string[]
}>()
</script>

<style scoped lang="scss">
.btn-link {
    color: $primary;
    padding: $spacer $spacer-4;

    .btn-icon {
        margin-right: $spacer-2;
        transform: scale(1.35);
    }
}
</style>
