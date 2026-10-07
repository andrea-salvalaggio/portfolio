<template>
    <div class="d-flex justify-content-between pb-4">
        <div class="d-flex align-items-center flex-grow-1">
            <img :src="experience.logo" :alt="experience.company" class="experience-logo rounded-pill me-sm-3" />
            <div class="experience-head">
                <div class="h6 experience-title fw-light mb-1">{{ experience.role }}</div>
                <p class="experience-text m-0">{{ experience.company }}</p>
            </div>
        </div>
        <div>
            <p class="experience-period m-0 text-end">{{ experience.period }}</p>
        </div>
    </div>
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
    border: 1px solid $gray-800;
    margin-right: $spacer-3;
}

.experience-title {
    color: $primary;
}

.experience-period {
    line-height: normal;
}
</style>
