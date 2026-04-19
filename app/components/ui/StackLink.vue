<template>
    <a :href="stack.url" class="btn-link fw-light d-flex align-items-center justify-content-between text-decoration-none roundend-1 w-100" target="_blank" :aria-label="stack.label">
        <div class="d-flex align-items-center">
            <font-awesome-icon :icon="stack.icon" class="fs-5 me-2" /> {{ stack.label }} 
        </div>
        <img src="/img/icons/arrow-top-right.svg" class="btn-icon lazyload" alt="Arrow" />
    </a>
</template>

<script setup>
defineProps({
    stack: {
        type: String,
        required: true
    }
})
</script>

<style scoped lang="scss">
.btn-link {
    color: $dark;
    background-color: $primary;
    padding: $spacer;

    .btn-icon {
        margin-right: $spacer-2;
        transform: scale(1.35);
    }
}
</style>