<template>
    <a :href="experience.url"
        class="btn-link fw-light text-decoration-none roundend-1 w-100"
        target="_blank" :aria-label="experience.label">
        <div class="d-flex justify-content-between pb-3 pb-sm-4">
            <div class="d-flex align-items-center flex-grow-1">
                <img :src="experience.logo" :alt="experience.company" class="experience-logo rounded-pill lazyload me-3" />
                <div class="experience-head">
                    <div class="h6 fw-light mb-1">{{ experience.role }}</div>
                    <p class="m-0">{{ experience.company }}</p>
                </div>
            </div>
            <div>
                <p class="m-0">{{ experience.period }}</p>
            </div>
        </div>
    </a>
</template>

<script setup>
defineProps({
    experience: {
        type: String,
        required: true
    }
})
</script>

<style scoped lang="scss">
.experience-logo {
    width: 50px;
    height: 50px;
    border: 1px solid $gray-300;
}
</style>
